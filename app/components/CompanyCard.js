import React from "react";
import { supabase } from "../../lib/supabase"; // Ensure correct path

export default function CompanyCard({ company, userRole }) {
  console.log("User role in CompanyCard:", userRole);

  const handleExpressInterest = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user || !user.user.id) throw new Error("User not authenticated.");
  
      const { error } = await supabase.from("interests").insert({
        company_name: company.name,          // text
        buyer_id: user.user.id,           // UUID
        seller_id: company.seller_id      // UUID
      });
  
      if (error) throw error;
      alert("Interest recorded successfully!");
    } catch (error) {
      console.error("Failed to record interest:", error.message);
      alert("Failed to record interest.");
    }
  };
  

  return (
    <div className="border p-4 rounded shadow">
      <img
        src={company.image_url || "https://via.placeholder.com/150"}
        alt={company.name}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-xl font-bold">{company.name}</h2>
      <p>{company.description}</p>
      <p>Price: ${company.price}</p>
      {/* ✅ Only show button if user is a buyer */}
      {userRole === "buyer" && (
        <button onClick={handleExpressInterest} className="mt-2 p-2 bg-blue-500 text-white rounded">
          Express Interest
        </button>
      )}
    </div>
  );
}
