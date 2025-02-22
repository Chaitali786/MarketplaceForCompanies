"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // ✅ Load both Supabase and JSON data
  const fetchCompanies = async () => {
    try {
      // Supabase Fetch
      const { data: supabaseData, error } = await supabase.from("companies").select("*");
      if (error) throw error;

      // JSON Fetch
      const response = await fetch("/data/companies.json")
      const jsonData = await response.json();

      // Combine both datasets
      const combinedData = [...supabaseData, ...jsonData];
      setCompanies(combinedData);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };

  // ✅ Fetch companies on page load
  useEffect(() => {
    fetchCompanies();
  }, []);

  // ✅ Filter the companies based on search and filters
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase()) ||
                          company.description.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = industry ? company.industry === industry : true;
    const matchesPrice = maxPrice ? company.price <= parseFloat(maxPrice) : true;

    return matchesSearch && matchesIndustry && matchesPrice;
  });

  // ✅ Extract unique industries for dropdown
  const uniqueIndustries = [...new Set(companies.map((c) => c.industry))];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Company Listings</h1>

      {/* ✅ Search and Filter Controls */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />

        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="border p-2 rounded w-1/3"
        >
          <option value="">All Industries</option>
          {uniqueIndustries.map((ind, index) => (
            <option key={index} value={ind}>
              {ind}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
      </div>

      {/* ✅ Display Filtered Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company) => (
          <div key={`${company.id}-${company.name}`} className="border p-4 rounded-lg shadow-md">
            <img
              src={company.image_url || "https://via.placeholder.com/150"}
              alt={company.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{company.name}</h2>
            <p className="text-gray-600">{company.description}</p>
            <p className="text-green-500 font-bold mt-2">{company.price} SEK</p>
            <p className="text-sm text-gray-500">Industry: {company.industry}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
