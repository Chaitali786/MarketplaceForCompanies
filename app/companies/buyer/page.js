"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function InterestedBuyersPage() {
  const [buyers, setBuyers] = useState([]);
  const [user, setUser] = useState(null);

  const fetchInterests = async (userEmail) => {
    const { data, error } = await supabase
      .from("interests")
      .select(`
        id, 
        user_email, 
        company_name,
        companies ( name, seller_email )
      `);

    console.log("Supabase Interests With Join - Data:", data);

    if (error) {
      console.error("Error fetching interests:", error.message);
    } else {
      const filteredBuyers = data.filter(
        (buyer) => buyer.companies?.seller_email === userEmail
      );
      setBuyers(filteredBuyers || []); // ✅ Now this works
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);

        if (user.user_metadata.role !== "seller") {
          alert("Access denied: Only sellers can view this page.");
          window.location.href = "/";
          return;
        }

        await fetchInterests(user.email); // ✅ Call fetchInterests here
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Interested Buyers</h1>

      {buyers.length === 0 ? (
        <p>No buyers have expressed interest yet.</p>
      ) : (
        <ul className="space-y-4">
          {buyers.map((buyer) => (
            <li key={buyer.id} className="border p-4 rounded shadow">
              <p className="font-bold">Buyer: {buyer.user_email}</p>
              <p>Interested in: {buyer.company_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
