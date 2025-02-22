"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function InterestedBuyersPage() {
  const [buyers, setBuyers] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ Fetch interested buyers
  const fetchInterestedBuyers = async (userEmail) => {
    const { data, error } = await supabase
      .from("interests")
      .select(`id, user_email, companies(name)`)
      .eq("companies.seller_email", userEmail);

    if (error) {
      console.error("Error fetching buyers:", error.message);
    } else {
      setBuyers(data);
    }
  };

  // ✅ Check user and fetch buyers
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        await fetchInterestedBuyers(user.email); // Pass email to fetch function
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
              <p>Interested in: {buyer.companies.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
