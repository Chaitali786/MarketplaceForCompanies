"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import CompanyCard from "../components/CompanyCard";

export default function CompaniesPage() {
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [userRole, setUserRole] = useState(null);

    // Filter states
    const [searchTerm, setSearchTerm] = useState(""); // Search by name/keywords
    const [priceFilter, setPriceFilter] = useState("all"); // Price range
    const [industryFilter, setIndustryFilter] = useState("all"); // Industry filter

    const fetchCompanies = async () => {
        try {
            const { data: supabaseData, error } = await supabase.from("companies").select("*");
            if (error) throw error;

            const response = await fetch("/data/companies.json");
            const jsonData = await response.json();

            const combinedData = [...supabaseData, ...jsonData];
            setCompanies(combinedData);
            setFilteredCompanies(combinedData); // Initialize with all companies
        } catch (error) {
            console.error("Failed to fetch data:", error.message);
        }
    };

    const getUserRole = async () => {
        try {
            const { data: user, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;

            const userId = user?.user?.id;
            if (userId) {
                const { data: profile, error: profileError } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", userId)
                    .single();
                if (profileError) throw profileError;
                if (profile?.role) setUserRole(profile.role.toLowerCase());
            }
        } catch (error) {
            console.warn("Error fetching user role:", error.message);
        }
    };

    //  Filter function
    const applyFilters = () => {
        let filtered = [...companies];

        // Search by name/keywords
        if (searchTerm) {
            filtered = filtered.filter((company) =>
                company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by price
        if (priceFilter !== "all") {
            filtered = filtered.filter((company) => {
                const price = parseFloat(company.price);
                if (priceFilter === "under-100k") return price < 100000;
                if (priceFilter === "100k-500k") return price >= 100000 && price <= 500000;
                if (priceFilter === "500k-1m") return price > 500000 && price <= 1000000;
                if (priceFilter === "above-1m") return price > 1000000;
                return true;
            });
        }

        //  Filter by industry
        if (industryFilter !== "all") {
            filtered = filtered.filter((company) =>
                company.industry.toLowerCase() === industryFilter.toLowerCase()
            );
        }

        setFilteredCompanies(filtered);
    };

    // Auto-apply filters on change
    useEffect(() => {
        applyFilters();
    }, [searchTerm, priceFilter, industryFilter, companies]);

    useEffect(() => {
        fetchCompanies();
        getUserRole();
    }, []);

    // Get unique industries for dropdown
    const uniqueIndustries = ["all", ...new Set(companies.map((c) => c.industry))];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Company Listings</h1>

            {/* Filter Section */}
            <div className="mb-4 flex flex-wrap items-center gap-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by name or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-1/3"
                />

                {/* Price Filter */}
                <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="all">All Prices</option>
                    <option value="under-100k">Under $100k</option>
                    <option value="100k-500k">$100k - $500k</option>
                    <option value="500k-1m">$500k - $1M</option>
                    <option value="above-1m">Above $1M</option>
                </select>

                {/* Industry Filter */}
                <select
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    {uniqueIndustries.map((industry) => (
                        <option key={industry} value={industry}>
                            {industry === "all" ? "All Industries" : industry}
                        </option>
                    ))}
                </select>
            </div>

            {/*  Company Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                        <CompanyCard key={company.id} company={company} userRole={userRole} />
                    ))
                ) : (
                    <p>No companies found</p>
                )}
            </div>
        </div>
    );
}