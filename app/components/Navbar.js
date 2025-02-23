"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter, usePathname } from "next/navigation"; // ✅ Import usePathname
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Navbar(userRole) {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current path
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUsername(session.user.email);
      }
    };

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
      router.push("/");
    }
  };

  return (
    <nav className="p-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Marketplace</Link>

        <div className="flex space-x-4 items-center">
          {username ? (
            <span className="mr-4">Welcome, {username}!</span>
          ) : (
            <Link href="/userauth/login" className="mr-4"></Link>
          )}

          {!username && <Link href="/userauth/signup" className="hover:underline">SignUp</Link>}
          <Link href="/companies" className="hover:underline">Companies</Link>

          {/* ✅ Show "Sell" and "Cart" ONLY if user is logged in AND is a seller */}
          {username && userRole?.userRole === "seller" && pathname !== "/" && (
            <>
              <Link href="/companies/sell" className="mr-4">Sell</Link>
              <Link href="/companies/buyer" className="flex items-center gap-1 hover:underline">
              <ShoppingCart size={16} />Cart</Link>
            </>
          )}

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
