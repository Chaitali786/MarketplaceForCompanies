import React from "react";
import { useState } from "react";
import { supabase } from "../../lib/supabase"; // Ensure correct path
import { ShoppingCart } from "lucide-react"; // ✅ Import Lucide icon
export default function CompanyCard({ company, userRole }) {
  console.log("User role in CompanyCard:", userRole);
  const [interestExpressed, setInterestExpressed] = useState(false);

  const handleClick = () => {
    handleExpressInterest();
    setInterestExpressed(true); // ✅ Set to true after clicking
  };
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
    <div className="border p-4 rounded-lg shadow h-72 flex flex-col justify-between">
    <img
      src={company.image_url || "https://via.placeholder.com/150"}
      alt={company.name}
      className="w-full h-36 object-cover rounded"
    />
    <div className="mt-2">
      <h2 className="text-lg font-bold">{company.name}</h2>
      <p className="text-gray-600 text-sm truncate">{company.description}</p>
      <p className="text-black font-medium mt-1">Price: ${company.price}</p>
    </div>
    {userRole === "buyer" && (
        interestExpressed ? (
          <p className="mt-3 text-green-600 font-medium">✅ Thank you!</p> // ✅ Show Thank you message
        ) : (
          <button
            onClick={handleClick}
            className="mt-3 flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded w-32 text-xs"
          >
            <ShoppingCart size={14} /> Express Interest
          </button>
        )
      )}
  </div>

  );
}
