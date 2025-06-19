"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  platform: [
    { name: "Find Teams", href: "/lfg" },
    { name: "Create Lobby", href: "/dashboard/lobbies/new" },
    { name: "Games", href: "/games" },
    { name: "Rankings", href: "/rankings" }
  ],
  community: [
    { name: "Discord", href: "#" },
    { name: "Forums", href: "#" },
    { name: "Tournaments", href: "#" },
    { name: "Events", href: "#" }
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Bug Reports", href: "#" },
    { name: "Feature Requests", href: "#" }
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "DMCA", href: "#" }
  ]
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
  { name: "Discord", icon: Github, href: "#", color: "hover:text-indigo-400" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-400" },
  { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-400" }
];

const supportedGames = [
  { name: "Valorant", logo: "/logos/valorant-logo.svg" },
  { name: "CS2", logo: "/logos/counter-strike-2.svg" },
  { name: "League of Legends", logo: "/logos/league-of-legends-logo.svg" },
  { name: "Fortnite", logo: "/logos/fortnite-logo.svg" },
  { name: "PUBG", logo: "/logos/pubg-logo.webp" }
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#9b87f5]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  <span className="text-[#9b87f5]">noob</span>.gg
                </h3>                <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                  The ultimate platform for gamers to find their perfect teammates. Join millions of players building legendary squads.
                </p>                {/* Newsletter Signup */}
                <div className="relative bg-gradient-to-br from-[#9b87f5]/10 via-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-[#9b87f5]/20 rounded-2xl p-8 max-w-md overflow-hidden shadow-2xl">
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/5 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#9b87f5]/10 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    {/* Logo */}
                    <div className="text-center mb-4">
                      <img 
                        src="/noobgg-logo.png" 
                        alt="noob.gg logo" 
                        className="w-12 h-12 mx-auto mb-3 rounded-lg shadow-md"
                      />
                    </div>
                    
                    <h4 className="text-white font-bold mb-2 text-xl text-center bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      Stay in the Loop
                    </h4>
                    <p className="text-gray-300 text-sm text-center mb-6 leading-relaxed">
                      Subscribe to our newsletter and never miss important updates, features, or community events.
                    </p>
                      {/* Modern Input */}
                    <div className="relative">
                      <div className="flex bg-slate-700/40 backdrop-blur-sm rounded-xl border border-slate-600/40 overflow-hidden shadow-lg">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm focus:ring-2 focus:ring-[#9b87f5]/50 focus:border-[#9b87f5]/50 transition-all duration-200"
                        />                        <button className="bg-gradient-to-r from-[#9b87f5] to-blue-500 hover:from-[#8b77e5] hover:to-blue-600 px-4 py-3 font-semibold text-white transition-colors duration-200 whitespace-nowrap text-sm flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        No spam
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                        </svg>
                        Secure
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Links Sections */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-semibold mb-6 capitalize">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-[#9b87f5] transition-colors duration-300 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Supported Games Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-slate-800/50"
          >
            <h4 className="text-white font-semibold mb-8 text-center">
              Supported Games
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {supportedGames.map((game, index) => (
                <motion.div
                  key={game.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="w-16 h-16 relative grayscale group-hover:grayscale-0 transition-all duration-300 hover:scale-110">
                    <Image
                      src={game.logo}
                      alt={game.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-xs whitespace-nowrap">
                      {game.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-gray-400 text-sm"
              >
                © 2025 NoobGG. All rights reserved. Made with ❤️ for gamers.
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-6"
              >
                <span className="text-gray-400 text-sm mr-2">Follow us:</span>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-slate-800/50`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 text-sm"
              >
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>2,143 online</span>
                </div>
                <div className="text-gray-500">|</div>
                <div className="text-gray-400">847 lobbies active</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
