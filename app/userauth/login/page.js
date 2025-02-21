"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";


import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert("Login successful!");
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-6 border rounded shadow-lg">
        <h1 className="text-2xl mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="block mb-2 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="block mb-2 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
