"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingHeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden font-light text-white antialiased" // Removed bg-* and pt-* classes
      // Removed inline style attribute for background
    >
      {/* Removed the two div elements for radial gradient glows */}
      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mb-6 inline-block rounded-full border border-[#9b87f5]/30 px-3 py-1 text-xs text-[#9b87f5]">
            Join 2,000+ gamers who found their perfect squad in under 5 minutes
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-exo2 font-semibold md:text-5xl lg:text-7xl">
            Still Getting Matched With{" "}
            <span className="text-[#9b87f5]">Randoms</span> Who Rage Quit?
          </h1>

          <div className="mb-10 mt-10 flex flex-col items-center justify-center gap-4 sm:mb-0 sm:flex-row">
            <Link
              href="/docs/get-started"
              className="neumorphic-button hover:shadow-[0_0_20px_rgba(155, 135, 245, 0.5)] relative w-full overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30 sm:w-auto"
            >
              Find Your Squad Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
