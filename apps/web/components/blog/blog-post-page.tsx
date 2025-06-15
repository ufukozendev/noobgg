"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Eye, Heart, MessageCircle, ArrowLeft, Share2, Bookmark } from "lucide-react";
import "@/styles/blog.css";

interface BlogPostPageProps {
  slug: string;
}

// Mock blog post data - in real app this would come from CMS/API
const mockPost = {
  id: "1",
  title: "The Ultimate Guide to Ranked Climbing in Valorant",
  content: `
    <h2>Introduction</h2>
    <p>Climbing the ranked ladder in Valorant requires more than just good aim. It's about understanding the game mechanics, team coordination, and strategic thinking. In this comprehensive guide, we'll cover everything you need to know to improve your rank.</p>
    
    <h2>Understanding the Ranking System</h2>
    <p>Valorant's ranking system is designed to match players of similar skill levels. The ranks range from Iron to Radiant, with each rank having three tiers (except Radiant). Your Rank Rating (RR) determines your progression through these ranks.</p>
    
    <h2>Key Strategies for Ranking Up</h2>
    <h3>1. Master Your Agent</h3>
    <p>Choose 2-3 agents and become proficient with them. Understanding your agent's abilities and how they synergize with your team is crucial for consistent performance.</p>
    
    <h3>2. Communication is Key</h3>
    <p>Use your microphone to call out enemy positions, coordinate strategies, and maintain team morale. Positive communication can turn around losing games.</p>
    
    <h3>3. Aim Training</h3>
    <p>Dedicate 30 minutes daily to aim training. Use tools like Aim Lab or Kovaak's to improve your precision and reaction time.</p>
    
    <h2>Common Mistakes to Avoid</h2>
    <ul>
      <li>Playing too aggressively without team support</li>
      <li>Not using abilities effectively</li>
      <li>Poor positioning and map awareness</li>
      <li>Tilting after losing rounds</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>Ranking up in Valorant is a journey that requires patience, practice, and continuous learning. Focus on improving one aspect at a time, and you'll see steady progress in your rank.</p>
  `,
  author: "ProGamer",
  authorBio: "Professional Valorant player with 5+ years of competitive experience",
  authorAvatar: "/avatars/progamer.jpg",
  publishDate: "2025-06-10",
  readTime: "8 min",
  category: "Valorant",
  tags: ["ranked", "tips", "strategy"],
  image: "/blog/valorant-ranked.jpg",
  views: 1250,
  likes: 89,
  comments: 23
};

const relatedPosts = [
  {
    id: "2",
    title: "Best Valorant Settings for Competitive Play",
    excerpt: "Optimize your game settings for maximum performance and visibility.",
    category: "Valorant",
    readTime: "5 min",
    image: "/blog/valorant-settings.jpg"
  },
  {
    id: "3",
    title: "Agent Synergy Guide: Best Team Compositions",
    excerpt: "Learn which agents work best together for different maps and strategies.",
    category: "Valorant", 
    readTime: "10 min",
    image: "/blog/agent-synergy.jpg"
  }
];

export default function BlogPostPage({ slug }: BlogPostPageProps) {
  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-6 pt-8">
        <Link href="/blog">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </motion.button>
        </Link>
      </div>      {/* Article Header */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Category Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-purple-600/10 border border-purple-500/20 rounded-full px-6 py-3 mb-8"
            >
              <span className="text-purple-400 text-sm font-semibold">{mockPost.category}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight"
            >
              {mockPost.title}
            </motion.h1>

            {/* Meta Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6 mb-12"
            >
              <div className="flex flex-wrap items-center justify-between gap-6">
                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {mockPost.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">{mockPost.author}</p>
                    <p className="text-gray-400 text-sm">Gaming Expert</p>
                  </div>
                </div>

                {/* Meta Stats */}
                <div className="flex items-center space-x-6 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">{new Date(mockPost.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">{mockPost.views.toLocaleString()}</span>
                  </div>
                  <div className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                    {mockPost.readTime}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center space-x-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 px-6 py-3 bg-red-600/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-600/20 transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                <span className="font-semibold">{mockPost.likes}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 px-6 py-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-600/20 transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-semibold">Share</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 px-6 py-3 bg-yellow-600/10 border border-yellow-500/20 text-yellow-400 rounded-xl hover:bg-yellow-600/20 transition-all duration-300"
              >
                <Bookmark className="w-5 h-5" />
                <span className="font-semibold">Save</span>
              </motion.button>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative aspect-video rounded-2xl overflow-hidden mb-16 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-purple-800/10"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl opacity-30">🎮</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div 
                  className="prose prose-invert prose-purple max-w-none prose-lg"
                  dangerouslySetInnerHTML={{ __html: mockPost.content }}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-800">
                  {mockPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.article>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-1"
              >
                {/* Author Info */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-white mb-4">About the Author</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {mockPost.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{mockPost.author}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{mockPost.authorBio}</p>
                </div>

                {/* Related Posts */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`}>
                        <div className="group cursor-pointer">
                          <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg mb-3 flex items-center justify-center">
                            <span className="text-2xl opacity-20">📄</span>
                          </div>
                          <h4 className="font-medium text-white group-hover:text-purple-300 transition-colors text-sm mb-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{post.category}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
