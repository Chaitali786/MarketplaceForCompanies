"use client";

import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      alert("Logged out successfully!");
      router.push("/userauth/login");
    }
  };

  return (
    <nav className="p-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Marketplace</Link>

        <div className="space-x-4">
          <Link href="/userauth/login" className="hover:underline">Login</Link>
          <Link href="/userauth/signup" className="hover:underline">Sign Up</Link>
          <Link href="/companies" className="hover:underline">Companies</Link>

          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
