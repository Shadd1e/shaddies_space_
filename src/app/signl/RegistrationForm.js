"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    niche: "",
    keywords: "",
    frequency: "24"
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("https://signl.shaddies.space/webhook/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ 
          type: "success", 
          message: "Registration successful! Check your email to confirm." 
        });
        setFormData({ email: "", niche: "", keywords: "", frequency: "24" });
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push("/signl/dashboard?status=registered");
        }, 2000);
      } else {
        setStatus({ 
          type: "error", 
          message: "Registration failed. Please try again." 
        });
      }
    } catch (error) {
      setStatus({ 
        type: "error", 
        message: "An error occurred. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status.message && (
        <div className={`p-4 rounded-lg text-sm ${
          status.type === "success" 
            ? "bg-green-600/20 border border-green-500/40 text-green-400" 
            : "bg-red-600/20 border border-red-500/40 text-red-400"
        }`}>
          {status.message}
        </div>
      )}

      <div>
        <label className="block text-white/80 text-sm mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          className="w-full p-3 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-white/40 transition"
        />
      </div>

      <div>
        <label className="block text-white/80 text-sm mb-2">Your Niche/Field</label>
        <input
          type="text"
          name="niche"
          value={formData.niche}
          onChange={handleChange}
          placeholder="e.g., Artificial Intelligence, Blockchain, Biotech"
          required
          className="w-full p-3 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-white/40 transition"
        />
      </div>

      <div>
        <label className="block text-white/80 text-sm mb-2">Keywords (comma-separated)</label>
        <input
          type="text"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          placeholder="AI, machine learning, startups, funding"
          required
          className="w-full p-3 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-white/40 transition"
        />
      </div>

      <div>
        <label className="block text-white/80 text-sm mb-2">Delivery Frequency</label>
        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-white/40 transition"
        >
          <option value="12">Twice daily (every 12 hours)</option>
          <option value="24">Daily (every 24 hours)</option>
          <option value="48">Every 2 days</option>
          <option value="168">Weekly</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full p-3 rounded-lg font-semibold transition ${
          isLoading 
            ? "bg-white/50 cursor-not-allowed" 
            : "bg-white text-black hover:bg-white/90"
        }`}
      >
        {isLoading ? "Registering..." : "Start Getting Updates →"}
      </button>

      <p className="text-white/50 text-xs text-center mt-4">
        By registering, you agree to our{" "}
        <Link href="/signl/terms" className="text-white/70 hover:text-white">Terms</Link>
        {" "}and{" "}
        <Link href="/signl/privacy" className="text-white/70 hover:text-white">Privacy Policy</Link>
      </p>
    </form>
  );
}