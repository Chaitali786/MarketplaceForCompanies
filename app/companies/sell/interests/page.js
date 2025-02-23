"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
export default function InterestedBuyersPage() {
    const [buyers, setBuyers] = useState([]);

    const fetchInterestedBuyers = async () => {
        try {
          const { data: user } = await supabase.auth.getUser();
          if (!user || !user.user.id) throw new Error("User not authenticated.");
      
          const { data, error } = await supabase
            .from("interests")
            .select(`
              company_name,
              buyers:profiles(email, full_name)   -- Assuming buyers' details are in 'profiles' table
            `)
            .eq("seller_id", user.user.id);
      
          if (error) throw error;
          return data;
        } catch (error) {
          console.error("Failed to fetch interested buyers:", error.message);
          return [];
        }
      };
      


    useEffect(() => {
        fetchInterestedBuyers();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Interested Buyers</h1>
            {buyers.length > 0 ? (
                <ul>
                    {buyers.map((interest) => (
                        <li key={interest.id} className="border p-2 mb-2 rounded">
                            <p>Buyer Email: {interest.buyers?.email}</p>
                            <p>Company: {interest.companies?.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No interested buyers found.</p>
            )}
        </div>
    );
}
