"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import StarWarsButton from "../syntax-ui/starwars-button";
import dynamic from "next/dynamic";

// Dynamically import Three Fiber Globe component
const ThreeFiberGlobe = dynamic(() => import("../ThreeFiberGlobe"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-[800px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-sm">Loading React Three Fiber Globe...</p>
        <p className="text-gray-400 text-xs mt-2">Optimized WebGL Rendering</p>
      </div>
    </div>
  ),
});

export default function LandingHeroSection() {
  // Globe component selection state - only Three Fiber now
  const [globeType, setGlobeType] = useState<'threeFiber'>('threeFiber');
  
  const GlobeComponent = ThreeFiberGlobe;
  return (
    <section
      className="relative w-full font-light text-white antialiased" // Removed bg-* and pt-* classes
      // Removed inline style attribute for background
    >
      {/* Removed the two div elements for radial gradient glows */}
      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mb-6 inline-block rounded-full border border-[#9b87f5]/30 px-3 py-1 text-s text-[#9b87f5]">
            Join 2,000+ gamers who found their perfect squad in under 5 minutes
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-exo2 font-semibold md:text-5xl lg:text-7xl">
            Still Getting Matched With{" "}
            <span className="text-[#9b87f5]">Randoms</span> Who Rage Quit?
          </h1>          
          <div className="mb-10 mt-10 flex flex-col items-center justify-center gap-4 sm:mb-0 sm:flex-row">
            <Link href="/docs/get-started">
              <StarWarsButton className="w-full sm:w-auto mb-4 mt-4">
                Find Your Squad Now
              </StarWarsButton>
            </Link>          </div>
        </motion.div>

        {/* Pick Your Game Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-20 w-screen max-w-full md:max-w-4xl"
        >
          <div className="text-center text-3xl text-white">
            <span className="text-[#6f52f4]">Pick Your Game. Find Your People.</span>
          </div>
          <div className="mt-10 grid grid-cols-5 gap-10 items-center px-4 lg:px-0">
            <img 
              alt="Valorant Logo" 
              loading="lazy" 
              width="220" 
              height="70" 
              className="w-full hover:scale-105 transition-transform cursor-pointer" 
              src="/logos/valorant-logo.svg"
            />
            <img 
              alt="League of Legends Logo" 
              loading="lazy" 
              width="220" 
              height="70" 
              className="w-full hover:scale-105 transition-transform cursor-pointer" 
              src="/logos/league-of-legends-logo.svg"
            />
            <img 
              alt="Fortnite" 
              loading="lazy" 
              width="220" 
              height="70" 
              className="w-full hover:scale-105 transition-transform cursor-pointer" 
              src="/logos/fortnite-logo.svg"
            />
            <img 
              alt="PlayerUnknown's Battlegrounds" 
              loading="lazy" 
              width="220" 
              height="70" 
              className="w-full hover:scale-105 transition-transform cursor-pointer" 
              src="/logos/pubg-logo.webp"
            />
            <img 
              alt="Counter Strike 2" 
              loading="lazy" 
              width="220" 
              height="70" 
              className="w-full hover:scale-105 transition-transform cursor-pointer" 
              src="/logos/counter-strike-2.svg"
            />          </div>
        </motion.div>        {/* Interactive 3D Realistic Globe Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-20 mb-10 flex items-center justify-center"
        >
          <div className="w-full max-w-6xl">            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                <span className="text-[#9b87f5]">Global Gaming Hubs</span>
              </h2>
              <p className="text-gray-300 text-lg">
                Discover active gaming communities worldwide with our interactive globe
              </p>
                {/* Globe Type Selector - Only Three Fiber */}
              <div className="flex justify-center gap-2 mt-6 mb-4">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-purple-500/20 text-purple-400 border border-purple-500/50"
                >
                  ⚠️ React Three Fiber (Optimized)
                </button>
              </div>
            </div>
            <GlobeComponent />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
