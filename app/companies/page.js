"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import CompanyCard from "../components/CompanyCard";

export default function CompaniesPage() {
    const [companies, setCompanies] = useState([]);
    const [userRole, setUserRole] = useState(null);

    const fetchCompanies = async () => {
        try {
            const { data: supabaseData, error } = await supabase.from("companies").select("*");
            if (error) throw error;

            const response = await fetch("/data/companies.json");
            const jsonData = await response.json();

            setCompanies([...supabaseData, ...jsonData]);
        } catch (error) {
            console.error("Failed to fetch data:", error.message);
        }
    };

    const getUserRole = async () => {
        try {
            const { data: user, error: userError } = await supabase.auth.getUser();
            console.log("User response from supabase.auth.getUser():", user);

            if (userError) throw userError;

            const userId = user?.user?.id;
            console.log("User ID:", userId);

            if (userId) {
                const { data: profile, error: profileError } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", userId)
                    .single();

                console.log("Profile response from Supabase:", profile);

                if (profileError) throw profileError;

                if (profile?.role) {
                    setUserRole(profile.role.toLowerCase());
                    console.log("User role set in state:", profile.role.toLowerCase());
                } else {
                    console.warn("No role found for this user.");
                }
            } else {
                console.warn("User ID not found.");
            }
        } catch (error) {
            console.error("Error fetching user role:", error.message);
        }
    };

    // ✅ Fetch companies when the component mounts
    useEffect(() => {
        fetchCompanies();
    }, []);

    // ✅ Fetch user role when the component mounts
    useEffect(() => {
        getUserRole();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Company Listings</h1>
             {/* <p>User Role: {userRole}</p>*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} userRole={userRole} />
                ))}
            </div>
        </div>
    );
}
