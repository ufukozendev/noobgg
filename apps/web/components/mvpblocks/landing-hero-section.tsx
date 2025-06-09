"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LandingHeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden pb-10 font-light text-white antialiased md:pb-16" // Removed bg-* and pt-* classes
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
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60 md:text-xl">
            Lunexa combines artificial intelligence with cutting-edge trading
            strategies to help you maximize your crypto investments with
            precision and ease.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:mb-0 sm:flex-row">
            <Link
              href="/docs/get-started"
              className="neumorphic-button hover:shadow-[0_0_20px_rgba(155, 135, 245, 0.5)] relative w-full overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30 sm:w-auto"
            >
              Find Your Squad Now
            </Link>
            <a
              href="#how-it-works"
              className="flex w-full items-center justify-center gap-2 text-white/70 transition-colors hover:text-white sm:w-auto"
            >
              <span>Learn how it works</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </a>
          </div>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="relative flex h-40 w-full overflow-hidden md:h-64">
            <Image
              src="https://blocks.mvp-subha.me/assets/earth.png"
              alt="Earth"
              className="absolute left-1/2 top-0 -z-10 mx-auto -translate-x-1/2 px-4 opacity-80"
              width={1920}
              height={1080}
            />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-lg shadow-[0_0_50px_rgba(155,135,245,0.2)]">
            <Image
              src="https://blocks.mvp-subha.me/assets/lunexa-db.png"
              alt="Lunexa Dashboard"
              width={1920}
              height={1080}
              className="h-auto w-full rounded-lg border border-white/10"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
