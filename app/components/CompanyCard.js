import React from "react";
export default function CompanyCard({ company, userRole }) {
  console.log("User role in CompanyCard:", userRole);
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
              <button className="bg-blue-500 text-white p-2 rounded mt-2">
                  Express Interest
              </button>
          )}
      </div>
  );
}


