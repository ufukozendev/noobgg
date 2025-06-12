"use client";

import React, { useState, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

interface Game {
  id: string;
  name: string;
  logo: string;
  description: string;
  features: string[];
  animation: {
    name: string;
    icon: string;
    description: string;
  };
}

const games: Game[] = [
  {
    id: "valorant",
    name: "Valorant",
    logo: "/logos/valorant-logo.svg",
    description: "Tactical 5v5 shooter that demands precise aim and strategic thinking.",
    features: ["Rank-based matchmaking", "Agent synergy", "Tactical coordination", "Competitive tournaments"],
    animation: {
      name: "Spike Plant",
      icon: "💣",
      description: "Strategic bomb placement"
    }
  },
  {
    id: "lol",
    name: "League of Legends",
    logo: "/logos/league-of-legends-logo.svg",
    description: "The world's most popular MOBA with endless strategic depth.",
    features: ["Role-based teams", "Champion mastery", "Ranked climbing", "Professional esports"],
    animation: {
      name: "Nexus Destruction",
      icon: "🏰",
      description: "Victory through teamwork"
    }
  },
  {
    id: "fortnite",
    name: "Fortnite",
    logo: "/logos/fortnite-logo.svg",
    description: "Battle royale with building mechanics and creative possibilities.",
    features: ["Squad building", "Creative mode", "Battle royale", "Cross-platform play"],
    animation: {
      name: "Victory Royale",
      icon: "👑",
      description: "Last squad standing"
    }
  },
  {
    id: "pubg",
    name: "PUBG",
    logo: "/logos/pubg-logo.webp",
    description: "Realistic battle royale experience with tactical gameplay.",
    features: ["Realistic combat", "Team tactics", "Map control", "Survival strategy"],
    animation: {
      name: "Chicken Dinner",
      icon: "🍗",
      description: "Winner winner!"
    }
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    logo: "/logos/counter-strike-2.svg",
    description: "The ultimate competitive FPS with precision-based gameplay.",
    features: ["Competitive ranking", "Team coordination", "Map knowledge", "Economy management"],
    animation: {
      name: "Bomb Defusal",
      icon: "🔧",
      description: "Clutch moments matter"
    }
  }
];

// Game-specific button styles function
function getGameButtonStyle(gameId: string): string {
  switch(gameId) {
    case 'valorant':
      return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-red-500/25'; // Valorant #ff4655 kırmızı teması
    case 'lol':
      return 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 hover:shadow-yellow-500/25'; // LoL #c89b3c altın teması
    case 'fortnite':
      return 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-purple-500/25'; // Fortnite #6f52f4 mor teması
    case 'pubg':
      return 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 hover:shadow-orange-500/25'; // PUBG turuncu-sarı battle royale teması
    case 'cs2':
      return 'bg-gradient-to-r from-slate-700 to-gray-700 hover:from-slate-800 hover:to-gray-800 hover:shadow-slate-500/25'; // CS2 koyu gri teması
    default:
      return 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-purple-500/25'; // Varsayılan tema
  }
}

// Dynamic OrbitControls Component
function DynamicOrbitControls({ gameId }: { gameId: string }) {  // Controls settings based on model type - LoL with max zoom out
  const getControlsSettings = () => {
    switch(gameId) {
      case 'lol':
        return {
          enableZoom: true,
          enablePan: true,
          enableRotate: true,
          minDistance: 40, // Much further for LoL - zoomed out
          maxDistance: 80,
          maxPolarAngle: Math.PI / 2.2,
          minPolarAngle: Math.PI / 6,
          enableDamping: true,
          dampingFactor: 0.05
        };      case 'fortnite': 
        return {
          enableZoom: true,
          enablePan: true,
          enableRotate: true,
          minDistance: 200, // %500 zoom out - extreme minimum distance
          maxDistance: 400, // %500 zoom out - satellite maximum
          maxPolarAngle: Math.PI / 2.2,
          minPolarAngle: Math.PI / 6,
          enableDamping: true,
          dampingFactor: 0.05
        };      case 'valorant':
        return {
          enableZoom: true,
          enablePan: true,
          enableRotate: true,
          minDistance: 25, // %125 zoom out - tactical minimum distance
          maxDistance: 75, // %125 zoom out - tactical maximum
          maxPolarAngle: Math.PI / 2.2,
          minPolarAngle: Math.PI / 6,
          enableDamping: true,
          dampingFactor: 0.05
        };      case 'pubg':
        return {
          enableZoom: true,
          enablePan: true,
          enableRotate: true,
          minDistance: 200, // %500 zoom out - extreme minimum distance like Fortnite
          maxDistance: 400, // %500 zoom out - satellite maximum like Fortnite
          maxPolarAngle: Math.PI / 2.2,
          minPolarAngle: Math.PI / 6,
          enableDamping: true,
          dampingFactor: 0.05
        };
      case 'cs2':
      default:
        return {
          enableZoom: true,
          enablePan: true,
          enableRotate: true,
          minDistance: 15,
          maxDistance: 50,
          maxPolarAngle: Math.PI / 2.2, // Restricted for top-down view
          minPolarAngle: Math.PI / 6,
          enableDamping: true,
          dampingFactor: 0.05
        };
    }
  };

  const settings = getControlsSettings();
  
  return (
    <OrbitControls
      enableZoom={settings.enableZoom}
      enablePan={settings.enablePan}
      enableRotate={settings.enableRotate}
      enableDamping={settings.enableDamping}
      dampingFactor={settings.dampingFactor}
      minDistance={settings.minDistance}
      maxDistance={settings.maxDistance}
      maxPolarAngle={settings.maxPolarAngle}
      minPolarAngle={settings.minPolarAngle}
    />
  );
}

function DynamicCamera({ gameId }: { gameId: string }) {
  const { camera } = useThree();
  // Camera settings based on model type - All games now use top-down view
  const getCameraSettings = () => {
    switch(gameId) {
      case 'lol':
        return { 
          position: [0, 300, 0] as [number, number, number], // Very high aerial view for better map visibility
          fov: 60,
          lookAt: [0, 0, 0] as [number, number, number]
        };      case 'fortnite': 
        return { 
          position: [0, 1500, 0] as [number, number, number], // %500 zoom out - extreme satellite view
          fov: 75, // Wider field of view for satellite perspective
          lookAt: [0, 0, 0] as [number, number, number]
        };      case 'valorant':
        return { 
          position: [0, 56, 0] as [number, number, number], // %125 zoom out - elevated tactical view
          fov: 65, // Slightly wider FOV for tactical overview
          lookAt: [0, 0, 0] as [number, number, number]
        };      case 'pubg':
        return { 
          position: [0, 1500, 0] as [number, number, number], // %500 zoom out - extreme satellite view like Fortnite
          fov: 75, // Wider FOV for satellite perspective
          lookAt: [0, 0, 0] as [number, number, number]
        };
      case 'cs2':
      default:
        return { 
          position: [0, 25, 0] as [number, number, number], // Standard top-down view
          fov: 60,
          lookAt: [0, 0, 0] as [number, number, number]
        };
    }
  };

  React.useEffect(() => {
    const settings = getCameraSettings();
    camera.position.set(...settings.position);
    if ('fov' in camera) {
      camera.fov = settings.fov;
      camera.updateProjectionMatrix();
    }
    camera.lookAt(...settings.lookAt);
  }, [gameId, camera]);

  return null;
}

function GameModel({ gameId }: { gameId: string }) {
  const { scene } = useGLTF(`/models/${gameId}/scene.gltf`);
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  // Clone the scene to avoid conflicts
  const clonedScene = scene.clone();
  
  // Debug logging for PUBG
  React.useEffect(() => {
    if (gameId === 'pubg') {
      console.log('PUBG model loaded:', clonedScene);
      console.log('PUBG scene children:', clonedScene.children);
      
      // Force texture loading for PUBG
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load('/models/pubg/textures/Material.001_diffuse.png', 
        (texture) => {
          console.log('PUBG texture loaded successfully:', texture);
          
          clonedScene.traverse((child) => {
            if ((child as any).isMesh && (child as any).material) {
              const mesh = child as THREE.Mesh;
              const material = mesh.material as THREE.MeshStandardMaterial;
              if (material.type === 'MeshStandardMaterial') {
                material.map = texture;
                material.needsUpdate = true;
                console.log('Applied texture to PUBG material:', material);
              }
            }
          });
          setIsLoaded(true);
        },
        undefined,
        (error) => {
          console.error('Error loading PUBG texture:', error);
          setIsLoaded(true); // Still render without texture
        }
      );
    } else {
      setIsLoaded(true);
    }
  }, [gameId, clonedScene]);
  
  // Enhanced material setup with better lighting response
  clonedScene.traverse((child) => {
    if ((child as any).isMesh && (child as any).material) {
      const mesh = child as THREE.Mesh;
      const material = (mesh.material as THREE.MeshStandardMaterial).clone();
      if (material.type === 'MeshStandardMaterial') {
        // Enhanced material properties for better visuals
        material.metalness = 0.2;
        material.roughness = 0.8;
        material.envMapIntensity = 1.0;
        material.needsUpdate = true;
        mesh.material = material;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
      
      // Special handling for PUBG materials
      if (gameId === 'pubg') {
        if (material.map) {
          material.map.needsUpdate = true;
        }
        // Ensure material is visible
        material.visible = true;
        material.opacity = 1.0;
        material.transparent = false;
        console.log('PUBG material configured:', material);
      }
    }
  });
    // Optimized scales for each game to fit perfectly in the larger card
  const getModelScale = () => {
    switch(gameId) {
      case 'valorant': return 2.5;
      case 'lol': return 2.0;
      case 'fortnite': return 2.3;
      case 'pubg': return 3.0; // Increased scale for better visibility
      case 'cs2': return 2.2;
      default: return 2.2;
    }
  };

  // Optimized positions for top-view map models - All games now at center
  const getModelPosition = () => {
    switch(gameId) {
      case 'valorant': return [0, 0, 0]; // Top-view map
      case 'lol': return [0, 0, 0]; // Top-view map
      case 'fortnite': return [0, 0, 0]; // Top-view map  
      case 'pubg': return [0, -2, 0]; // Slightly lowered for better view
      case 'cs2': return [0, 0, 0]; // Top-view map
      default: return [0, 0, 0];
    }
  };
  
  return (
    <primitive 
      object={clonedScene} 
      scale={getModelScale()}
      position={getModelPosition()}
    />
  );
}

export default function GameShowcase() {
  const [currentGame, setCurrentGame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentGameData = games[currentGame];
  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent">
      <div className="container mx-auto px-4 max-w-7xl">        {/* Section Title and Description */}
        <div className="text-center mb-16">
          <motion.h2 
            key={`title-${currentGame}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Lorem Ipsum Dolor Sit Amet
          </motion.h2>
          <motion.p 
            key={`desc-${currentGame}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto mb-4"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            <span className="text-purple-400 font-semibold"> Ut enim ad minim veniam</span> quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full px-6 py-2 text-sm font-medium text-red-200"
          >
            <span className="animate-pulse">✨</span>
            Duis aute irure dolor in reprehenderit
            <span className="animate-pulse">✨</span>
          </motion.div>
        </div>
        
        {/* Game Selection Bar */}
        <div className="flex justify-center mb-16">
          <div className="flex bg-black/40 backdrop-blur-md rounded-2xl p-2 border border-purple-500/20">
            {games.map((game, index) => (
              <button
                key={game.id}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentGame(index);
                    setIsAnimating(false);
                  }, 300);
                }}
                className={`relative p-4 rounded-xl transition-all duration-300 ${
                  currentGame === index
                    ? "bg-purple-500/30 border border-purple-400/50"
                    : "hover:bg-white/10"
                }`}
              >
                <Image
                  src={game.logo}
                  alt={game.name}
                  width={80}
                  height={40}
                  className="h-8 w-auto object-contain filter brightness-100 hover:brightness-110 transition-all"
                />
                {currentGame === index && (
                  <motion.div
                    layoutId="activeGame"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-400/30"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Game Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGame}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* Left Side - Game Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center space-x-4"
                >
                  <Image
                    src={currentGameData.logo}
                    alt={currentGameData.name}
                    width={200}
                    height={80}
                    className="h-16 w-auto object-contain"
                  />
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-xl text-gray-300 leading-relaxed"
                >
                  {currentGameData.description}
                </motion.p>
              </div>

              {/* Features List */}              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent">Lorem Ipsum Consectetur {currentGameData.name} Adipiscing?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentGameData.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      className="flex items-center space-x-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-3 rounded-lg border border-purple-500/20"
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-white font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >                <button 
                  className={`text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    currentGameData.id === 'valorant' 
                      ? 'bg-gradient-to-r from-[#ff4655] to-[#ff6b81] hover:from-[#ff4655] hover:to-[#ff5a7b] shadow-[#ff4655]/25'
                      : currentGameData.id === 'lol'
                      ? 'bg-gradient-to-r from-[#c89b3c] to-[#e6c66e] hover:from-[#c89b3c] hover:to-[#d9b860] shadow-[#c89b3c]/25'
                      : currentGameData.id === 'fortnite'
                      ? 'bg-gradient-to-r from-[#6f52f4] to-[#9b73f9] hover:from-[#6f52f4] hover:to-[#8a62f7] shadow-[#6f52f4]/25'
                      : currentGameData.id === 'pubg'
                      ? 'bg-gradient-to-r from-[#f97316] to-[#facc15] hover:from-[#f97316] hover:to-[#f9b815] shadow-[#f97316]/25'
                      : currentGameData.id === 'cs2'
                      ? 'bg-gradient-to-r from-[#374151] to-[#4b5563] hover:from-[#374151] hover:to-[#556270] shadow-[#374151]/25'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-purple-500/25'
                  }`}
                >
                  Lorem {currentGameData.name} Ipsum (Finally!)
                </button>
              </motion.div>
            </div>            {/* Right Side - 3D Model Showcase - Normal Boyut */}
            <div className="relative w-full h-[400px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute inset-0 rounded-2xl border border-purple-500/40 backdrop-blur-lg shadow-xl overflow-hidden"
              >
                {/* Canvas - Normal Boyut */}                <Canvas
                  camera={{ position: [0, 4, 18], fov: 50, far: 5000 }}
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(30, 58, 138, 0.3) 100%)',
                    width: '150%', 
                    height: '150%',
                    borderRadius: '16px'
                  }}
                  gl={{ antialias: true, alpha: true }}
                  shadows
                >
                  <Suspense fallback={null}>
                    <DynamicCamera gameId={currentGameData.id} />
                    
                    {/* Enhanced Lighting Setup */}
                    <ambientLight intensity={0.4} />
                    <directionalLight 
                      position={[10, 10, 5]} 
                      intensity={1.2} 
                      castShadow
                      shadow-mapSize-width={2048}
                      shadow-mapSize-height={2048}
                    />
                    <pointLight position={[-10, -10, -5]} intensity={0.6} color="#4fc3f7" />
                    <spotLight 
                      position={[0, 15, 10]} 
                      intensity={0.8} 
                      angle={Math.PI / 6}
                      penumbra={0.5}
                      color="#9333ea"
                      castShadow
                    />
                    <GameModel gameId={currentGameData.id} />
                    
                    <DynamicOrbitControls gameId={currentGameData.id} />
                    <Environment preset="city" background={false} />
                    
                  </Suspense>
                </Canvas>                  {/* UI Overlays - Modern Glassmorphism */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xl rounded-lg px-2.5 py-1.5 border border-purple-500/30 z-20"
                     style={{ boxShadow: '0 4px 10px rgba(123, 31, 162, 0.15)' }}>
                  <span className="text-xs font-medium bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">3D Map View</span>
                </div>
                
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xl rounded-lg px-2.5 py-1.5 border border-green-500/30 z-20"
                     style={{ boxShadow: '0 4px 10px rgba(34, 197, 94, 0.15)' }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Live Preview</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xl rounded-lg px-2.5 py-1.5 border border-blue-500/30 z-20"
                     style={{ boxShadow: '0 4px 10px rgba(59, 130, 246, 0.15)' }}>
                  <span className="text-xs font-medium text-gray-200">Drag • Pan • Zoom</span>
                </div>

                {/* Animated Background Effects */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl pointer-events-none z-10"
                />

                {/* Particle Effects */}
                {[...Array(6)].map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute w-2 h-2 bg-purple-400 rounded-full pointer-events-none z-10"
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index % 2) * 40}%`
                    }}
                  />
                ))}
              </motion.div>

              {/* Squad Connection Visualization */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
              >
                <div className="flex justify-center items-center space-x-3 mb-3">
                  {[...Array(4)].map((_, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white/20"
                    >
                      P{index + 1}
                    </motion.div>
                  ))}
                </div>
                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-purple-300 font-medium"
                >
                  Lorem Ipsum • Dolor Sit Amet
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// Preload all game models
games.forEach(game => {
  useGLTF.preload(`/models/${game.id}/scene.gltf`);
});
