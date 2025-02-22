"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/userauth/login");
  };

  return (
    
      <main className="">
      <div className="flex items-center justify-center h-screen ">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Marketplace</h1>
        <p className="text-gray-600 mb-6">
          Discover and invest in companies that match your interests.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition"
        >
          Get Started
        </button>
      </div>
      </div>
      </main>
      
    
  );
}
