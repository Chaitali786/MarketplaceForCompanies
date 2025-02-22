"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // ✅ Define message state
    const [error, setError] = useState(""); // ✅ Define error state
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
    
        try {
            const { data, error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (loginError) throw loginError;
    
            const user = data.user;
            if (user) {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", user.id)
                    .single();
                if (profile?.role) {
                    localStorage.setItem("userRole", profile.role.toLowerCase()); // ✅ Store role in localStorage
                    router.push(profile.role.toLowerCase() === "buyer" ? "/companies" : "/companies/sell");
                } else {
                    throw new Error("Invalid role. Please contact admin.");
                }
            }
        } catch (err) {
            setError(err.message || "Invalid email or password.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {message && <p className="text-green-500 mb-2">{message}</p>} {/* ✅ Display success */}
            {error && <p className="text-red-500 mb-2">{error}</p>} {/* ✅ Display error */}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Login
                </button>
            </form>
        </div>
    );
}
