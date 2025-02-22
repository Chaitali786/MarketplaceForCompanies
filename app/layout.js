"use client";

import Navbar from "./components/Navbar";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import "./globals.css"; 

export default function RootLayout({ children }) {
    const [userRole, setUserRole] = useState(null);
    console.log("User Role at Layout:", userRole);
    // ✅ Get user role when the app loads
    const getUserRole = async () => {
        try {
            const { data: user, error } = await supabase.auth.getUser();
            if (error) throw error;

            if (user?.user) {
                const { data: profile, error: profileError } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", user.user.id) // ✅ Corrected: user.user.id
                    .single();

                if (profileError) throw profileError;

                setUserRole(profile?.role?.toLowerCase() || null);
            }
        } catch (err) {
            console.error("Failed to get user role:", err.message);
        }
    };

    useEffect(() => {
        getUserRole();
    }, []);

    return (
        <html lang="en">
            <body>
                <Navbar userRole={userRole} /> {/* ✅ Pass userRole as prop */}
                {children}
            </body>
        </html>
    );
}
