"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Use 'next/navigation' for Next.js 13+
import { signUp } from '../../../lib/auth';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("buyer");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter(); // ✅ Initialize router for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const result = await signUp(email, password, role);
            setMessage(result.message); // ✅ Show success message
            setTimeout(() => {
                router.push("/userauth/login"); // ✅ Redirect to login after 3 seconds
            }, 3000);
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

                {message && <p className="text-green-600 mb-4">{message} Redirecting to login...</p>}
                {error && <p className="text-red-600 mb-4">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
