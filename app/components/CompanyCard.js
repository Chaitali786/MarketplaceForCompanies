import React from "react";
import { supabase } from "../../lib/supabase"; // Ensure correct path

export default function CompanyCard({ company, userRole }) {
  console.log("User role in CompanyCard:", userRole);

  const handleExpressInterest = async () => {
    try {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) throw new Error("User not authenticated.");
  
      const { error } = await supabase.from("interests").insert({
        company_name: company.name,           // Use company name
        buyer_id: user.user.id,               // Buyer's ID
        user_email: user.user.email,          // ✅ Save buyer's email
        seller_id: company.seller_id,         // Seller's ID
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
