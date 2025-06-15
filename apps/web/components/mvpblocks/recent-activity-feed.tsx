"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Trophy, UserPlus, Gamepad2, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { ActivityItem } from "@/lib/mock-data/activity-feed";
import { generateMockActivity } from "@/lib/mock-data/activity-feed";

function ActivityIcon({ type }: { type: ActivityItem["type"] }) {
  const iconProps = "w-4 h-4";
  
  switch (type) {
    case "join":
      return <UserPlus className={`${iconProps} text-blue-400`} />;
    case "win":
      return <Trophy className={`${iconProps} text-yellow-400`} />;
    case "create":
      return <Gamepad2 className={`${iconProps} text-green-400`} />;
    case "achievement":
      return <Trophy className={`${iconProps} text-purple-400`} />;
    default:
      return <Users className={`${iconProps} text-gray-400`} />;
  }
}

function ActivityItem({ activity, index }: { activity: ActivityItem; index: number }) {
  const timeAgo = Math.floor((Date.now() - activity.timestamp) / 1000);
  const timeText = timeAgo < 60 ? "just now" : `${Math.floor(timeAgo / 60)}m ago`;  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.02,
        ease: "easeOut"
      }}
      layout
      className="flex items-center gap-3 p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-slate-600/50 transition-all duration-300 group hover:scale-[1.02]"
    >
      {/* User Avatar */}
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
          {activity.user.username.slice(0, 2).toUpperCase()}
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600">
          <ActivityIcon type={activity.type} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-white truncate">
            {activity.user.username}
          </span>
          {activity.user.rank && (
            <span className="text-xs px-2 py-0.5 bg-[#9b87f5]/20 text-[#9b87f5] rounded-full">
              {activity.user.rank}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span className="truncate">{activity.action}</span>
          {activity.game && (
            <>
              <span className="text-gray-500">in</span>
              <span className="font-medium" style={{ color: activity.game.color }}>
                {activity.game.name}
              </span>
            </>
          )}
        </div>

        {activity.details && (
          <p className="text-xs text-gray-400 mt-1 truncate">
            {activity.details}
          </p>
        )}
      </div>

      {/* Game Logo & Time */}
      <div className="flex flex-col items-end gap-1">
        {activity.game && (
          <div className="w-6 h-6 relative">
            <Image
              src={activity.game.logo}
              alt={activity.game.name}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{timeText}</span>
        </div>
        {activity.region && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{activity.region}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function RecentActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    // Generate initial activities
    const initialActivities = Array.from({ length: 8 }, () => generateMockActivity())
      .sort((a, b) => b.timestamp - a.timestamp);
    setActivities(initialActivities);

    // Add new activities periodically
    const interval = setInterval(() => {
      const newActivity = generateMockActivity();
      setActivities(prev => {
        const newActivities = [newActivity, ...prev.slice(0, 11)]; // Keep max 12 items
        return newActivities;
      });
    }, 3000 + Math.random() * 4000); // Random interval between 3-7 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Live <span className="text-[#9b87f5]">Community</span> Activity
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            See what's happening right now in our gaming community
          </p>
          
          {/* Live indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 font-medium">Live Activity Feed</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        </motion.div>        <div className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-[600px] overflow-hidden relative"
          ><div className="space-y-4 overflow-y-auto h-full pr-2 scrollbar-hide">
              <AnimatePresence initial={false}>
                {activities.map((activity, index) => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            {/* Gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pointer-events-none" />          </motion.div>
        </div>
      </div>
    </section>
  );
}
