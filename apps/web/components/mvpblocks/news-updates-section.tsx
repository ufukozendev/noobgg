"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Zap, Users, Trophy, Star } from "lucide-react";
import Image from "next/image";

interface NewsItem {
  id: string;
  type: "feature" | "patch" | "tournament" | "community";
  title: string;
  description: string;
  date: string;
  readTime: string;
  image?: string;
  game?: {
    name: string;
    logo: string;
  };
  tags: string[];
  featured?: boolean;
}

const newsData: NewsItem[] = [
  {
    id: "1",
    type: "feature",
    title: "Introducing Smart Team Chemistry",
    description: "Our new AI-powered matching system now considers play styles, communication preferences, and personality traits for even better team matches.",
    date: "2025-06-14",
    readTime: "3 min read",
    image: "/news/gaming-hero.jpg",
    tags: ["AI", "Matchmaking", "New Feature"],
    featured: true
  },
  {
    id: "2",
    type: "patch",
    title: "Platform Update 2.1.0",
    description: "Enhanced lobby creation with advanced filters, improved mobile experience, and performance optimizations across all supported games.",
    date: "2025-06-12",
    readTime: "2 min read",
    image: "/news/gaming-hero.jpg",
    tags: ["Update", "Performance", "Mobile"],
  },
  {
    id: "3",
    type: "tournament",
    title: "NoobGG Summer Championship",
    description: "Join our biggest tournament yet! $10,000 prize pool across 5 games. Registration opens next week for teams formed through our platform.",
    date: "2025-06-10",
    readTime: "4 min read",
    image: "/news/gaming-hero.jpg",
    tags: ["Tournament", "Esports", "$10K Prize"],
    featured: true
  },
  {
    id: "4",
    type: "community",
    title: "Community Milestone: 50K+ Players",
    description: "We've reached an incredible milestone! Thank you to our amazing community for making NoobGG the go-to platform for team finding.",
    date: "2025-06-08",
    readTime: "1 min read",
    image: "/news/gaming-hero.jpg",
    tags: ["Milestone", "Community", "Thank You"],
  },
  {
    id: "5",
    type: "patch",
    title: "Valorant Rank Sync Improvements",
    description: "Better accuracy in rank detection and sync with Riot's API. Your current rank will now update automatically within hours of changes.",
    date: "2025-06-06",
    readTime: "2 min read",
    image: "/news/gaming-hero.jpg",
    game: {
      name: "Valorant",
      logo: "/logos/valorant-logo.svg"
    },
    tags: ["Valorant", "Ranks", "API"]
  },
  {
    id: "6",
    type: "feature",
    title: "Voice Chat Integration Beta",
    description: "Test our new built-in voice chat feature. Connect with your team instantly without needing external apps.",
    date: "2025-06-04",
    readTime: "3 min read",
    image: "/news/gaming-hero.jpg",
    tags: ["Voice Chat", "Beta", "Communication"]
  }
];

function NewsTypeIcon({ type }: { type: NewsItem["type"] }) {
  const iconProps = "w-4 h-4";
  
  switch (type) {
    case "feature":
      return <Zap className={`${iconProps} text-blue-400`} />;
    case "patch":
      return <Star className={`${iconProps} text-green-400`} />;
    case "tournament":
      return <Trophy className={`${iconProps} text-yellow-400`} />;
    case "community":
      return <Users className={`${iconProps} text-purple-400`} />;
    default:
      return <Calendar className={`${iconProps} text-gray-400`} />;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined
  });
}

function NewsCard({ news, index, featured = false }: { news: NewsItem; index: number; featured?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group cursor-pointer ${
        featured 
          ? "md:col-span-2 lg:col-span-1" 
          : ""
      }`}
    >
      <div className={`bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/70 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl h-full ${
        featured ? "bg-gradient-to-br from-[#9b87f5]/5 to-purple-500/5" : ""
      }`}>
        {/* Image */}
        {news.image && (
          <div className="relative h-48 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-slate-900/60 z-10" />
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {featured && (
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-gradient-to-r from-[#9b87f5] to-purple-600 px-3 py-1 rounded-full text-xs font-semibold text-white">
                  Featured
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2">
              <NewsTypeIcon type={news.type} />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {news.type}
              </span>
            </div>
            {news.game && (
              <div className="flex items-center gap-2 ml-auto">
                <Image
                  src={news.game.logo}
                  alt={news.game.name}
                  width={16}
                  height={16}
                  className="object-contain"
                />
                <span className="text-xs text-gray-400">{news.game.name}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className={`font-bold text-white mb-3 group-hover:text-[#9b87f5] transition-colors duration-300 ${
            featured ? "text-xl" : "text-lg"
          }`}>
            {news.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
            {news.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {news.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-slate-700/50 text-gray-300 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(news.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{news.readTime}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-[#9b87f5] group-hover:gap-2 transition-all duration-300">
              <span className="text-xs font-medium">Read more</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function NewsUpdatesSection() {
  const featuredNews = newsData.filter(news => news.featured);
  const regularNews = newsData.filter(news => !news.featured);

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
            Latest <span className="text-[#9b87f5]">News</span> & Updates
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Stay up to date with platform improvements, game updates, and community events
          </p>
        </motion.div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-12">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-6 flex items-center gap-2"
            >
              <Star className="w-6 h-6 text-[#9b87f5]" />
              Featured Updates
            </motion.h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((news, index) => (
                <NewsCard
                  key={news.id}
                  news={news}
                  index={index}
                  featured={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-6"
          >
            Recent Updates
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((news, index) => (
              <NewsCard
                key={news.id}
                news={news}
                index={index}
              />
            ))}
          </div>
        </div>        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="relative bg-gradient-to-br from-[#9b87f5]/10 via-slate-800/60 to-slate-900/80 backdrop-blur-xl border border-[#9b87f5]/20 rounded-3xl p-10 shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#9b87f5]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              {/* Logo */}
              <div className="mb-6">
                <img 
                  src="/noobgg-logo.png" 
                  alt="noob.gg logo" 
                  className="w-16 h-16 mx-auto mb-4 rounded-xl shadow-lg"
                />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Stay in the Loop
              </h3>
              <p className="text-gray-300 mb-8 mx-auto leading-relaxed text-lg max-w-lg">
                Subscribe to our newsletter and never miss important updates, features, or community events.
              </p>
              
              {/* Modern Input */}
              <div className="max-w-lg mx-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5] to-blue-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-sm"></div>
                  <div className="relative flex bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-600/40 overflow-hidden shadow-xl group-hover:border-[#9b87f5]/40 transition-all duration-300">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                    />                    <button className="bg-gradient-to-r from-[#9b87f5] to-blue-500 hover:from-[#8b77e5] hover:to-blue-600 px-6 py-4 font-semibold text-white transition-colors duration-300 whitespace-nowrap shadow-lg flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    No spam, ever
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                    </svg>
                    Secure & Private
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Weekly updates
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
