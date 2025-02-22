"use client";

import Navbar from "./components/Navbar";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import "./globals.css";

export default function RootLayout({ children }) {
    const [userRole, setUserRole] = useState(() => {
        // ✅ Initialize from localStorage if available
        return typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
    });

    useEffect(() => {
        const getUserRole = async (user) => {
            try {
                if (user) {
                    const { data: profile } = await supabase
                        .from("profiles")
                        .select("role")
                        .eq("id", user.id)
                        .single();
                    if (profile?.role) {
                        setUserRole(profile.role.toLowerCase());
                        localStorage.setItem("userRole", profile.role.toLowerCase()); // ✅ Store in localStorage
                    }
                }
            } catch (error) {
                console.error("Failed to get user role:", error.message);
            }
        };

        const fetchUser = async () => {
            try {
                const { data: sessionData } = await supabase.auth.getSession();
                const user = sessionData?.session?.user || null;
                getUserRole(user);
            } catch (error) {
                console.error("Failed to get user session:", error.message);
            }
        };

        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            getUserRole(session?.user || null);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <html lang="en">
            <body>
                <Navbar userRole={userRole} />
                {children}
            </body>
        </html>
    );
}
