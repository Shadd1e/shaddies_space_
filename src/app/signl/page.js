import Link from "next/link";
import FlowBackground from "@/components/FlowBackground";
import { Suspense } from 'react';
import RegistrationForm from './RegistrationForm';

export default function SignlHome() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FlowBackground />
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-white">Signl</div>
        <div className="space-x-6">
          <Link href="/signl/privacy" className="text-white/80 hover:text-white transition">
            Privacy
          </Link>
          <Link href="/signl/terms" className="text-white/80 hover:text-white transition">
            Terms
          </Link>
          <Link 
            href="/signl/dashboard" 
            className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Never Miss an Update in Your Field
            </h1>
            <p className="text-xl text-white/80">
              Signl scans the internet 24/7 for the latest news, trends, and updates in your chosen field. 
              Get curated email digests tailored to your interests.
            </p>
            
            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                <span className="text-white/90">AI-powered content scanning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                <span className="text-white/90">Customizable keywords and niches</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                <span className="text-white/90">Choose your delivery frequency</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                <span className="text-white/90">Free forever - just an email away</span>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Get Started Now</h2>
            <p className="text-white/70 mb-8">
              Enter your email and preferences below. That's it. We'll handle the rest.
            </p>
            
            <Suspense fallback={<div className="text-white">Loading form...</div>}>
              <RegistrationForm />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between text-white/60 text-sm">
          <div>© 2024 Signl. All rights reserved.</div>
          <div className="space-x-6">
            <Link href="/signl/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/signl/terms" className="hover:text-white transition">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}