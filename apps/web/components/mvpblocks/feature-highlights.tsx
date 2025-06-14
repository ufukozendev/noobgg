"use client";

import { motion } from "framer-motion";
import { Target, Gamepad2, Zap, Trophy, Crown, Mic } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Smart Matchmaking",
    description: "Advanced algorithm matches you with players of similar skill level and playstyle",
    color: "from-blue-500 to-cyan-500",
    stats: "95% match satisfaction"
  },
  {
    icon: Gamepad2,
    title: "Multi-Platform",
    description: "Access all your favorite games from one unified platform",
    color: "from-purple-500 to-pink-500",
    stats: "5+ games supported"
  },
  {
    icon: Zap,
    title: "Instant Connect",
    description: "Find and join teams in under 30 seconds with our fast matching system",
    color: "from-orange-500 to-red-500",
    stats: "< 30 sec average"
  },
  {
    icon: Trophy,
    title: "Skill Tracking",
    description: "Monitor your progress and climb the ranks with detailed analytics",
    color: "from-green-500 to-emerald-500",
    stats: "Real-time updates"
  },  {
    icon: Crown,
    title: "Tournament Mode",
    description: "Join competitive tournaments with prize pools and climb the leaderboards",
    color: "from-yellow-500 to-amber-500",
    stats: "Weekly events"
  },
  {
    icon: Mic,
    title: "Voice Integration",
    description: "Built-in voice chat with noise cancellation and team communication tools",
    color: "from-indigo-500 to-purple-500",
    stats: "Crystal clear audio"
  }
];

export default function FeatureHighlights() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#9b87f5]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-[#9b87f5]/20 to-purple-500/20 border border-[#9b87f5]/30 px-4 py-2 rounded-full text-sm text-[#9b87f5] font-medium backdrop-blur-sm">
              ⚡ Next-Gen Gaming Platform
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The <span className="bg-gradient-to-r from-[#9b87f5] via-purple-400 to-pink-400 bg-clip-text text-transparent">Science</span> Behind Perfect Teams
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Where cutting-edge AI meets gaming intuition. We don't just match players – 
            we forge <span className="text-[#9b87f5] font-semibold">legendary squads</span> that dominate together.
          </p>
        </motion.div>        {/* Modern iOS-style 3D Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isLarge = index === 0 || index === 3; // Make first and last items larger
            const gridClass = isLarge ? "lg:col-span-6" : "lg:col-span-3";
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className={`${gridClass} group relative`}
                style={{ perspective: '1000px' }}
              >
                <div className={`relative h-full min-h-[300px] ${isLarge ? 'lg:min-h-[340px]' : ''} 
                  bg-white/5 backdrop-blur-2xl
                  border border-white/10 rounded-[32px] p-8 
                  shadow-[0_8px_32px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]
                  hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_8px_32px_rgba(155,135,245,0.2)]                  transition-all duration-700 ease-out
                  hover:transform hover:translate-y-[-8px]
                  overflow-hidden
                  group-hover:border-white/20
                  before:absolute before:inset-0 before:rounded-[32px] 
                  before:bg-gradient-to-br before:from-white/[0.08] before:to-transparent 
                  before:pointer-events-none`}
                  style={{
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* iOS-style inner shadow */}
                  <div className="absolute inset-[1px] rounded-[31px] 
                    shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.1)]" />
                  
                  {/* Dynamic color overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700">
                    <div className={`w-full h-full bg-gradient-to-br ${feature.color} rounded-[32px]`} />
                  </div>
                  
                  {/* Subtle grid pattern */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                    <div className="w-full h-full rounded-[32px]" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                      backgroundSize: '24px 24px'
                    }} />
                  </div>
                  
                  {/* Floating light orb */}
                  <div className="absolute top-6 right-6 w-20 h-20 opacity-[0.08] group-hover:opacity-[0.15] transition-all duration-700">
                    <div className={`w-full h-full bg-gradient-to-br ${feature.color} rounded-full blur-xl
                      group-hover:scale-125 group-hover:rotate-90 transition-all duration-700`} />
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col transform-gpu">                    {/* iOS-style Icon Container */}
                    <div className="mb-8 transform-gpu transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                      <div className={`relative w-24 h-24 rounded-[20px] bg-gradient-to-br ${feature.color} p-5
                        shadow-[0_4px_20px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]
                        group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_4px_20px_rgba(155,135,245,0.3)]
                        group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-500
                        before:absolute before:inset-[1px] before:rounded-[19px] 
                        before:bg-gradient-to-br before:from-white/20 before:to-transparent`}
                      >
                        <IconComponent className="w-full h-full text-white drop-shadow-lg relative z-10" />
                        
                        {/* Icon highlight */}
                        <div className="absolute top-1 left-1 right-1 h-2 
                          bg-gradient-to-r from-white/40 to-transparent rounded-t-[18px]" />
                      </div>
                    </div>                    {/* Content */}
                    <div className="flex-1 transform-gpu transition-transform duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1">
                      <h3 className={`font-bold text-white mb-4 group-hover:text-[#9b87f5] 
                        transition-colors duration-300 drop-shadow-sm
                        ${isLarge ? 'text-2xl' : 'text-xl'}`}
                      >
                        {feature.title}
                      </h3>
                      <p className={`text-gray-300 leading-relaxed mb-8 drop-shadow-sm
                        ${isLarge ? 'text-base' : 'text-sm'}`}
                      >
                        {feature.description}
                      </p>
                    </div>
                      {/* iOS-style Stats Badge */}
                    <div className="mt-auto transform-gpu transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                      <div className={`inline-flex items-center gap-3 
                        bg-white/[0.08] backdrop-blur-xl
                        border border-white/10 px-5 py-3 rounded-2xl
                        shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]
                        group-hover:bg-white/[0.12] group-hover:border-white/20 
                        group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                        transition-all duration-300`}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full shadow-sm
                          bg-gradient-to-br ${feature.color} animate-pulse`} />
                        <span className="text-white text-sm font-medium drop-shadow-sm">
                          {feature.stats}
                        </span>
                      </div>                    </div>                    

                    {/* 3D depth lines */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                      <div className="absolute top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                      <div className="absolute top-4 bottom-4 left-4 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
                      <div className="absolute top-4 bottom-4 right-4 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl" />
            
            <div className="relative bg-gradient-to-r from-slate-800/80 via-slate-800/60 to-slate-800/80 
              backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 text-center overflow-hidden">
              
              {/* Animated background elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#9b87f5]/20 rounded-full blur-2xl animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                <div className="relative z-10">
                <div className="inline-block mb-6">
                  <span className="bg-gradient-to-r from-[#9b87f5]/30 to-purple-500/30 border border-[#9b87f5]/40 px-4 py-2 rounded-full text-sm text-[#9b87f5] font-medium backdrop-blur-sm">
                    🚀 Join the Gaming Revolution
                  </span>
                </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Ready to <span className="bg-gradient-to-r from-[#9b87f5] via-purple-400 to-pink-400 bg-clip-text text-transparent">Dominate</span>?
                </h3>                <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>

                {/* Trust indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-3 text-gray-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 
                      rounded-xl flex items-center justify-center border border-green-500/30">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold">Instant Matches</div>
                      <div className="text-sm text-gray-400">&lt; 30 seconds</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 text-gray-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 
                      rounded-xl flex items-center justify-center border border-blue-500/30">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold">100% Secure</div>
                      <div className="text-sm text-gray-400">Privacy first</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 text-gray-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 
                      rounded-xl flex items-center justify-center border border-purple-500/30">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold">Free Forever</div>
                      <div className="text-sm text-gray-400">No hidden fees</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>        </motion.div>
      </div>
    </section>
  );
}
