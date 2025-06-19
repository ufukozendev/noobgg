"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { GamesOverlay } from "../games";
import { useIsMobile } from "../../hooks/use-mobile";

// Dynamically import Three Fiber Globe component
const ThreeFiberGlobe = dynamic(() => import("../ThreeFiberGlobe").then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-[1000px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl">
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
  const isMobile = useIsMobile();

  const GlobeComponent = ThreeFiberGlobe;
  return (    <section
      className="relative w-full font-light text-white antialiased overflow-hidden -mt-32"
      style={{
        minHeight: '120vh',
        paddingTop: '8rem'
      }}
    >{/* Full Background covering header to globe */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(/landingpage-full.png)',
          backgroundPosition: 'center calc(50% - 10rem)'
        }}
      />      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0613]/70 via-[#0a0613]/50 to-[#0a0613]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0613]/30 via-transparent to-[#0a0613]/30" />
      
      {/* Bottom section background fill to match the background image tone */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#0A0A1A] via-[#1E274D]/90 to-transparent" />      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative py-4 flex flex-col justify-center items-center min-h-[40vh]"
        >
          {/* Simple Badge - No glassmorphism */}
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 inline-block rounded-full border border-[#9b87f5]/40 px-4 py-2 text-sm text-[#9b87f5] bg-slate-800/60 hover:scale-105 transition-all duration-300 cursor-default"
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Join 2,000+ gamers who found their perfect squad in under 5 minutes
            </span>
          </motion.span>          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mx-auto mb-4 max-w-4xl text-4xl font-exo2 font-semibold md:text-5xl lg:text-7xl drop-shadow-2xl"
          >
            <span className="text-white">
              Still Getting Matched With{" "}
            </span>
            <span className="text-[#9b87f5]">
              Randoms
            </span>
            <span className="text-white">
              {" "}Who Rage Quit?
            </span>
          </motion.h1>          {/* Hologram Gaming Terminal Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-6 mt-6 flex flex-col items-center justify-center gap-4 sm:mb-0 sm:flex-row"
          >
            <Link href="/docs/get-started">              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden px-8 py-4 text-lg font-mono font-bold text-white w-full sm:w-auto transition-all duration-300"
                style={{
                  background: 'linear-gradient(145deg, rgba(139,69,233,0.1), rgba(168,85,247,0.1))',
                  border: '2px solid #9b87f5',
                  clipPath: 'polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)',
                  boxShadow: '0 0 20px rgba(155,135,245,0.3), inset 0 0 20px rgba(139,69,233,0.1)'
                }}
              >                {/* Hologram scan lines */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                      style={{ top: `${i * 12.5}%` }}
                      animate={{ 
                        opacity: [0.3, 0.8, 0.3],
                        scaleX: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 2, 
                        delay: i * 0.2,
                        repeat: Infinity 
                      }}
                    />
                  ))}
                </div>

                {/* Digital glitch effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    clipPath: 'polygon(0 20%, 100% 0%, 100% 80%, 0% 100%)'
                  }}
                />

                {/* Corner brackets */}
                <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-purple-400"></div>
                <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-purple-400"></div>
                <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-purple-400"></div>
                <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-purple-400"></div>

                {/* HUD elements */}
                <div className="absolute -top-2 left-4 text-xs text-purple-400 font-mono">
                  [SQUAD_FINDER_V2.1]
                </div>
                <div className="absolute -bottom-2 right-4 text-xs text-violet-400 font-mono">
                  &gt; READY_
                </div>

                <span className="relative z-10 flex items-center gap-3">                  {/* Terminal prompt icon */}
                  <motion.div
                    className="flex items-center gap-1"
                    animate={{
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  >
                    <div className="w-2 h-2 bg-violet-400 rounded-sm"></div>
                    <div className="w-1 h-1 bg-purple-400 rounded-sm"></div>
                    <div className="w-1 h-1 bg-violet-400 rounded-sm"></div>
                  </motion.div>
                  
                  <span className="tracking-wider">
                    FIND_YOUR_SQUAD.exe
                  </span>
                    {/* Terminal cursor */}
                  <motion.div
                    className="w-3 h-5 bg-violet-400"
                    animate={{
                      opacity: [1, 0, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity
                    }}
                  />
                </span>

                {/* Activation effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-violet-400/30"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: 1, 
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Click pulse */}
                <motion.div
                  className="absolute inset-0 border-2 border-purple-400"
                  style={{
                    clipPath: 'polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)'
                  }}
                  initial={{ scale: 1, opacity: 0 }}
                  whileTap={{ 
                    scale: 1.1, 
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>

          <style jsx>{`
            @keyframes dataStream {
              0% { transform: translateX(-100%) skewX(-15deg); }
              100% { transform: translateX(100%) skewX(-15deg); }
            }
          `}</style>{/* Games Overlay Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex justify-center"
          >
            <GamesOverlay isMobile={isMobile} />
          </motion.div>
        </motion.div>        {/* Gaming Card Section with Globe */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mx-auto mt-8 w-full max-w-6xl"
        >{/* Card Container - Clean design */}
          <div className="relative rounded-2xl p-8 overflow-hidden">            <div className="relative z-10">              {/* Globe Section Title */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-[#9b87f5] via-blue-400 to-[#9b87f5] bg-clip-text text-transparent">
                    Global Gaming Hubs
                  </span>
                </h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                  Discover active gaming communities worldwide with our interactive globe
                </p>
              </div>{/* Globe Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
                className="relative flex justify-center items-center transform scale-105"
                style={{ minHeight: '600px' }}
              >
                <GlobeComponent />
              </motion.div>
            </div>
          </div>        </motion.div>

      </div>
    </section>
  );
}