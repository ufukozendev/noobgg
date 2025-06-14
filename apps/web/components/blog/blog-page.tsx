"use client";

import React, { useState, useRef, useMemo, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Calendar, User, Eye, Heart, MessageCircle, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  comments: number;
  featured?: boolean;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Ranked Climbing in Valorant",
    excerpt: "Master the art of climbing ranks with these proven strategies and techniques that pro players use.",
    content: "Full article content here...",
    author: "ProGamer",
    authorAvatar: "/avatars/progamer.jpg",
    publishDate: "2025-06-10",
    readTime: "8 min",
    category: "Valorant",
    tags: ["ranked", "tips", "strategy"],
    image: "/blog/gaming-hero.jpg",
    views: 1250,
    likes: 89,
    comments: 23,
    featured: true
  },
  {
    id: "2",
    title: "League of Legends Season 15 Meta Analysis",
    excerpt: "Deep dive into the current meta and what champions are dominating the rift this season.",
    content: "Full article content here...",
    author: "MetaExpert",
    authorAvatar: "/avatars/metaexpert.jpg",
    publishDate: "2025-06-08",
    readTime: "12 min",
    category: "League of Legends",
    tags: ["meta", "champions", "analysis"],
    image: "/blog/gaming-hero.jpg",
    views: 2100,
    likes: 156,
    comments: 45
  },
  {
    id: "3",
    title: "Building the Perfect Gaming Setup on a Budget",
    excerpt: "Get the most performance for your money with these carefully selected components and peripherals.",
    content: "Full article content here...",
    author: "TechGuru",
    authorAvatar: "/avatars/techguru.jpg",
    publishDate: "2025-06-05",
    readTime: "15 min",
    category: "Hardware",
    tags: ["setup", "budget", "hardware"],
    image: "/blog/gaming-hero.jpg",
    views: 3200,
    likes: 245,
    comments: 67
  },
  {
    id: "4",
    title: "CS2 Smoke Lineups Every Player Should Know",
    excerpt: "Essential smoke lineups for popular maps that will give you a competitive edge.",
    content: "Full article content here...",
    author: "SmokeKing",
    authorAvatar: "/avatars/smokeking.jpg",
    publishDate: "2025-06-03",
    readTime: "6 min",
    category: "CS2",
    tags: ["smokes", "lineups", "maps"],
    image: "/blog/gaming-hero.jpg",
    views: 890,
    likes: 67,
    comments: 12
  },
  {
    id: "5",
    title: "Pro Player Aim Training Routines",
    excerpt: "Train like the pros with these effective aim training routines used by professional esports players.",
    content: "Full article content here...",
    author: "AimCoach",
    authorAvatar: "/avatars/aimcoach.jpg",
    publishDate: "2025-06-01",
    readTime: "10 min",
    category: "Tips",
    tags: ["aim", "training", "practice"],
    image: "/blog/gaming-hero.jpg",
    views: 1850,
    likes: 134,
    comments: 28
  },
  {
    id: "6",
    title: "Understanding Game Psychology",
    excerpt: "Mental strategies to stay calm under pressure and improve your gameplay performance.",
    content: "Full article content here...",
    author: "MindCoach",
    authorAvatar: "/avatars/mindcoach.jpg",
    publishDate: "2025-05-28",
    readTime: "14 min",
    category: "Tips",
    tags: ["psychology", "mental", "performance"],
    image: "/blog/gaming-hero.jpg",
    views: 976,
    likes: 87,
    comments: 19
  }
];

// GLTF Logo Component
function Logo() {
  const { scene } = useGLTF("/models/duck/logo.gltf");
  const logoRef = useRef<THREE.Group>(null);

  // Clone scene to avoid issues with multiple instances
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (clonedScene) {
      // Scale the model appropriately for the hero section
      clonedScene.scale.set(2.5, 2.5, 2.5);
      
      // Enhance materials
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Apply enhanced material if no texture exists
          if (!child.material.map) {
            child.material = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#9b87f5"),
              metalness: 0.3,
              roughness: 0.4,
              emissive: new THREE.Color("#4c1d95"),
              emissiveIntensity: 0.05,
            });
          }
        }
      });
    }
  }, [clonedScene]);

  return (
    <group ref={logoRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

// 3D Hero Model with GLTF
function Hero3DModel() {
  return (
    <group>
      {/* Main GLTF Logo */}
      <Suspense fallback={null}>
        <Logo />
      </Suspense>
    </group>
  );
}

// Error Indicator Component (like the red dot in your drawing)
function ErrorIndicator() {
  return (
    <motion.div
      className="absolute top-4 left-4 z-20"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="w-4 h-4 bg-red-500 rounded-full shadow-lg border-2 border-red-300"
        style={{
          boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
        }}
      >
        {/* Pulsing animation */}
        <motion.div
          className="w-full h-full bg-red-500 rounded-full"
          animate={{ 
            opacity: [1, 0.3, 1],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}

// iOS-style Blog Card
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Error Indicator - like your red dot */}
      <ErrorIndicator />
      
      {/* Image */}
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] relative">
          {/* Blog post image */}
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* iOS-style overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        
        {post.featured && (
          <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-white/30">
            Featured
          </div>
        )}
        
        {/* Category badge - iOS style */}
        <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/20">
          {post.category}
        </div>
      </div>

      {/* Content - iOS style spacing */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors leading-tight line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-300/80 mb-4 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Bottom meta - iOS style */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {post.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-white">{post.author}</p>
              <p className="text-xs text-gray-400">{post.readTime}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{post.views > 1000 ? `${(post.views/1000).toFixed(1)}k` : post.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const filteredPosts = mockBlogPosts;

  return (
    <div className="min-h-screen">
      {/* iOS-style Hero Section */}
      <section className="relative py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600">Blog</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300/90 max-w-4xl leading-relaxed">
                Discover the latest gaming strategies, esports insights, and pro tips from industry experts.
              </p>
            </motion.div>

            {/* Right Column - 3D Model */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-96 lg:h-[500px]"
            >
              <div className="w-full h-full relative">
                <Canvas 
                  camera={{ position: [0, 0, 5], fov: 50 }}
                  style={{ pointerEvents: 'auto', cursor: 'grab' }}
                >
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  <OrbitControls 
                    enablePan={false} 
                    enableZoom={true} 
                    enableRotate={true}
                    autoRotate={false}
                    makeDefault
                  />
                  <Hero3DModel />
                </Canvas>
                
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5 rounded-3xl pointer-events-none" />
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* iOS-style Blog Posts Grid */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Preload the GLTF model
useGLTF.preload("/models/duck/logo.gltf");
