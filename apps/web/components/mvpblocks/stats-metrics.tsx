"use client";

import { motion } from "framer-motion";
import { Users, Gamepad, Trophy, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface StatItem {
  icon: any;
  label: string;
  value: number;
  suffix: string;
  color: string;
  description: string;
}

const statsData: StatItem[] = [
  {
    icon: Users,
    label: "Active Players",
    value: 2143,
    suffix: "",
    color: "from-blue-500 to-cyan-500",
    description: "Online right now"
  },
  {
    icon: Gamepad,
    label: "Lobbies Created",
    value: 847,
    suffix: "",
    color: "from-green-500 to-emerald-500",
    description: "Today"
  },
  {
    icon: Trophy,
    label: "Successful Matches",
    value: 1294,
    suffix: "",
    color: "from-purple-500 to-pink-500",
    description: "This week"
  },
  {
    icon: Clock,
    label: "Avg. Wait Time",
    value: 23,
    suffix: "s",
    color: "from-orange-500 to-red-500",
    description: "To find teammates"
  }
];

// Number animation hook
function useAnimatedNumber(target: number, duration: number = 2000) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(startValue + (target - startValue) * easeOutCubic);
      
      setCurrent(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100);

    return () => clearTimeout(timer);
  }, [target, duration]);

  return current;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const animatedValue = useAnimatedNumber(stat.value, 2000 + index * 200);
  const IconComponent = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 h-full hover:border-slate-600/70 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl">
        {/* Background glow effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className="w-full h-full text-white" />
        </div>

        {/* Value */}
        <div className="mb-2">
          <span className="text-3xl md:text-4xl font-bold text-white">
            {animatedValue.toLocaleString()}
          </span>
          <span className="text-2xl md:text-3xl font-bold text-white">
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <h3 className="text-lg font-semibold text-gray-200 mb-1">
          {stat.label}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400">
          {stat.description}
        </p>

        {/* Live indicator for first stat */}
        {index === 0 && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-medium">LIVE</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function StatsMetrics() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9b87f5]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Numbers Speak for <span className="text-[#9b87f5]">Themselves</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Real-time stats from our thriving gaming community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Additional community metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-[#9b87f5] mb-2">98.5%</div>
            <div className="text-gray-300">Match Satisfaction Rate</div>
          </div>
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">24/7</div>
            <div className="text-gray-300">Active Community</div>
          </div>
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">5 Games</div>
            <div className="text-gray-300">Supported Platforms</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
