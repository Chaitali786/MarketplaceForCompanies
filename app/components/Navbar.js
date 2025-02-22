"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar(userRole) {
  const router = useRouter();
  const [username, setUsername] = useState(null);
  console.log("User Role at Navbar:", userRole);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Session:", session); // ✅ Check if session is available

      if (session?.user) {
        setUsername(session.user.email);
      }
    };

    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUsername(session.user.email);
      } else {
        setUsername(null);
      }
    });

    fetchUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
          {username ? (
            <span className="mr-4">Welcome, {username}!</span>
          ) : (
            <Link href="/userauth/login" className="mr-4">
              
            </Link>
          )}

          <Link href="/userauth/signup" className="hover:underline">SignUp</Link>
          <Link href="/companies" className="hover:underline">Companies</Link>
          
          {/* ✅ Show "Sell" button only if userRole is "seller" */}
          {userRole?.userRole === "seller" && <a href="/companies/sell" className="mr-4">Sell</a>}

          {username && (
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
