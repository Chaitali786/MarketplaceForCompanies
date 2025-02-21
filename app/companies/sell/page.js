"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function SellCompanyPage() {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    industry: "",
    image_url: "",
  });

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setShowMessage(true);
        setTimeout(() => {
          router.push("/userauth/login");
        }, 3000);
      } else {
        setUser(user);
      }
    };

    checkUser();
  }, [router]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const { data, error } = await supabase.from("companies").insert([
      {
        ...formData,
        seller_email: user.email, // Store the logged-in user's email
      },
    ]);

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert("Company listed successfully!");
      router.push("/companies");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {showMessage ? (
        <div className="text-center text-red-500 font-bold text-lg">
          You need to login first. Redirecting to login page...
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Sell Your Company</h1>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
            <div>
              <label className="block font-semibold mb-1">Company Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Retail">Retail</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Image URL</label>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded font-bold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
