import { supabase } from "../../lib/supabase";


export default async function CompaniesPage() {
  // Fetch companies from Supabase
  const { data: companies, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("Error fetching companies:", error.message);
    return <div>Error loading companies.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Company Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <div key={company.id} className="border p-4 rounded-lg shadow-md">
            <img
              src={company.image_url || "https://via.placeholder.com/150"}
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
