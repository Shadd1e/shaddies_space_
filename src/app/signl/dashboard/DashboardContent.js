"use client";

import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FlowBackground from "@/components/FlowBackground";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock user data - In production, fetch this based on logged-in user
const MOCK_USER = {
  name: "John Doe",
  email: "john@example.com",
  niche: "Artificial Intelligence",
  keywords: "AI, machine learning, neural networks",
  frequency: "24",
  memberSince: "January 2024",
  totalUpdates: 156
};

export default function DashboardContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [user, setUser] = useState(MOCK_USER);
  const [isEditing, setIsEditing] = useState(null); // 'niche', 'keywords', 'frequency', or null

  useEffect(() => {
    // Here you would fetch real user data based on session/auth
    // For now using mock data
  }, []);

  const handleUpdate = async (type, value) => {
    // Here you would make API call to update
    console.log(`Updating ${type} to:`, value);
    setUser({ ...user, [type]: value });
    setIsEditing(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8">
      <FlowBackground />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/signl" className="text-white/60 hover:text-white text-sm">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-white mt-2">Welcome back, {user.name}! 👋</h1>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-lg">
            <span className="text-white/60 text-sm">Member since</span>
            <p className="text-white font-semibold">{user.memberSince}</p>
          </div>
        </div>

        {/* Status Messages */}
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 rounded-lg bg-green-600/20 border border-green-500/40 text-green-400"
            >
              {status === "registered" && "🎉 Registration successful! Welcome to Signl!"}
              {status === "updated" && "✅ Your preferences have been updated."}
              {status === "deactivated" && "⚠️ Subscription deactivated."}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard 
            title="Total Updates" 
            value={user.totalUpdates} 
            icon="📊"
            subtitle="since joining"
          />
          <StatCard 
            title="Current Niche" 
            value={user.niche} 
            icon="🎯"
            subtitle="your focus area"
          />
          <StatCard 
            title="Frequency" 
            value={user.frequency === "24" ? "Daily" : user.frequency === "12" ? "Twice Daily" : "Weekly"} 
            icon="⏰"
            subtitle="delivery schedule"
          />
        </div>

        {/* Main Content Area */}
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Your Preferences</h2>
          
          <div className="space-y-6">
            {/* Email Display */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <label className="text-white/60 text-sm block mb-1">Email Address</label>
              <p className="text-white font-mono">{user.email}</p>
            </div>

            {/* Niche */}
            <EditableField
              label="Your Niche/Field"
              value={user.niche}
              isEditing={isEditing === 'niche'}
              onEdit={() => setIsEditing('niche')}
              onSave={(value) => handleUpdate('niche', value)}
              onCancel={() => setIsEditing(null)}
              type="text"
              placeholder="e.g., Artificial Intelligence"
            />

            {/* Keywords */}
            <EditableField
              label="Keywords"
              value={user.keywords}
              isEditing={isEditing === 'keywords'}
              onEdit={() => setIsEditing('keywords')}
              onSave={(value) => handleUpdate('keywords', value)}
              onCancel={() => setIsEditing(null)}
              type="text"
              placeholder="AI, machine learning, startups"
              multiline
            />

            {/* Frequency */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-start">
                <div>
                  <label className="text-white/60 text-sm block mb-1">Delivery Frequency</label>
                  {isEditing === 'frequency' ? (
                    <select
                      defaultValue={user.frequency}
                      className="bg-black/60 border border-white/20 text-white p-2 rounded-lg"
                      onBlur={(e) => handleUpdate('frequency', e.target.value)}
                      autoFocus
                    >
                      <option value="12">Twice daily (every 12 hours)</option>
                      <option value="24">Daily (every 24 hours)</option>
                      <option value="48">Every 2 days</option>
                      <option value="168">Weekly</option>
                    </select>
                  ) : (
                    <p className="text-white font-semibold">
                      {user.frequency === "24" ? "Daily" : 
                       user.frequency === "12" ? "Twice Daily" : 
                       user.frequency === "48" ? "Every 2 days" : "Weekly"}
                    </p>
                  )}
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing('frequency')}
                    className="text-white/60 hover:text-white text-sm"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Deactivate Section */}
        <div className="mt-6 bg-red-950/30 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold mb-1">Deactivate Subscription</h3>
              <p className="text-white/60 text-sm">Stop receiving updates and delete your data</p>
            </div>
            <form action="https://signl.shaddies.space/webhook/deactivate" method="POST">
              <input type="hidden" name="email" value={user.email} />
              <button 
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Deactivate
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-white/10 text-sm text-white/70 flex justify-between">
          <Link href="/signl" className="hover:underline">
            ← Back to Home
          </Link>
          <div className="space-x-4">
            <Link href="/signl/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/signl/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, subtitle }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <p className="text-white/60 text-sm">{title}</p>
      </div>
      <p className="text-white text-xl font-bold">{value}</p>
      <p className="text-white/40 text-xs mt-1">{subtitle}</p>
    </div>
  );
}

// Editable Field Component
function EditableField({ label, value, isEditing, onEdit, onSave, onCancel, type, placeholder, multiline }) {
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <label className="text-white/60 text-sm block mb-1">{label}</label>
          {isEditing ? (
            <div className="space-y-2">
              {multiline ? (
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 text-white p-2 rounded-lg"
                  rows="2"
                  autoFocus
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                />
              ) : (
                <input
                  type={type}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 text-white p-2 rounded-lg"
                  autoFocus
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                />
              )}
              <p className="text-white/40 text-xs">Press Enter to save, Esc to cancel</p>
            </div>
          ) : (
            <p className="text-white font-semibold">{value}</p>
          )}
        </div>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="text-white/60 hover:text-white text-sm ml-4"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}