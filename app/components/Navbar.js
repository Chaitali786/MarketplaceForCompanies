"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar(userRole) {
    const router = useRouter();
    const pathname = usePathname();
    const [username, setUsername] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) setUsername(session.user.email);
        };

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUsername(session?.user?.email || null);
        });

        fetchUser();
        return () => authListener.subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) alert(error.message);
        else {
            alert("Logged out successfully!");
            router.push("/");
        }
    };

    return (
        <nav className="navbar">
            <div className="container flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">Marketplace</Link>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden"
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className="navbar-links hidden md:flex space-x-4">
                    {username ? (
                        <span className="mr-4">Welcome, {username}!</span>
                    ) : (
                        <Link href="/userauth/signup" className="hover:underline">SignUp</Link>
                    )}

                    <Link href="/companies" className="hover:underline">Companies</Link>

                    {username && userRole?.userRole === "seller" && pathname !== "/" && (
                        <>
                            <Link href="/companies/sell" className="hover:underline">Sell</Link>
                            <Link href="/companies/buyer" className="flex items-center gap-1 hover:underline">
                                <ShoppingCart size={16} /> Cart
                            </Link>
                        </>
                    )}

                    {username && (
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                            Logout
                        </button>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="navbar-mobile-menu flex flex-col md:hidden space-y-2 p-4">
                    {username ? (
                        <span className="mr-4">Welcome, {username}!</span>
                    ) : (
                        <Link href="/userauth/signup" className="hover:underline">SignUp</Link>
                    )}

                    <Link href="/companies" className="hover:underline">Companies</Link>

                    {username && userRole?.userRole === "seller" && pathname !== "/" && (
                        <>
                            <Link href="/companies/sell" className="hover:underline">Sell</Link>
                            <Link href="/companies/buyer" className="flex items-center gap-1 hover:underline">
                                <ShoppingCart size={16} /> Cart
                            </Link>
                        </>
                    )}

                    {username && (
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}
