"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // ✅ 1. Fetch from Supabase
        const { data: supabaseData, error } = await supabase.from("companies").select("*");
        if (error) throw new Error(`Supabase: ${error.message}`);

        // ✅ 2. Fetch from JSON
        const response = await fetch("/data/companies.json");
        if (!response.ok) throw new Error("Failed to fetch JSON data");
        const jsonData = await response.json();

        // ✅ 3. Combine both arrays into one
        const combinedData = [...jsonData, ...supabaseData];

        setCompanies(combinedData);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Company Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <div key={company.id || company.name} className="border p-4 rounded-lg shadow-md">
            <img
              src={company.image_url || company.image || "https://via.placeholder.com/150"}
              alt={company.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{company.name}</h2>
            <p className="text-gray-600">{company.description}</p>
            <p className="text-green-500 font-bold mt-2">${company.price}</p>
            <p className="text-sm text-gray-500">Industry: {company.industry}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
