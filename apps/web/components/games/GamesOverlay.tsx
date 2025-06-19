'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Game {
  name: string;
  logo: string;
  alt: string;
  delay: number;
  players: string;
  color: string;
  gradient: string;
}

interface GamesOverlayProps {
  isMobile?: boolean;
}

const GAMES: Game[] = [
  {
    name: 'Valorant',
    logo: '/logos/valorant-logo.svg',
    alt: 'Valorant Logo',
    delay: 0.1,
    players: '15.2K',
    color: '#FF4655',
    gradient: 'from-red-500/20 to-orange-500/20'
  },
  {
    name: 'League of Legends',
    logo: '/logos/league-of-legends-logo.svg',
    alt: 'League of Legends Logo',
    delay: 0.2,
    players: '22.8K',
    color: '#C89B3C',
    gradient: 'from-yellow-500/20 to-amber-500/20'
  },
  {
    name: 'Fortnite',
    logo: '/logos/fortnite-logo.svg',
    alt: 'Fortnite',
    delay: 0.3,
    players: '8.3K',
    color: '#00D4FF',
    gradient: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    name: 'PUBG',
    logo: '/logos/pubg-logo.webp',
    alt: 'PlayerUnknown\'s Battlegrounds',
    delay: 0.4,
    players: '12.1K',
    color: '#F77F00',
    gradient: 'from-orange-500/20 to-yellow-500/20'
  },
  {
    name: 'Counter Strike 2',
    logo: '/logos/counter-strike-2.svg',
    alt: 'Counter Strike 2',
    delay: 0.5,
    players: '18.9K',
    color: '#FF6B00',
    gradient: 'from-orange-600/20 to-red-500/20'
  }
];

export const GamesOverlay = React.memo(({ isMobile = false }: GamesOverlayProps) => {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold mb-2">
          <span className="text-[#9b87f5]">Pick Your Game.</span>{" "}
          <span className="text-white">Find Your People.</span>
        </h3>
        <p className="text-gray-400 text-sm">
          Join active gaming communities and find your perfect squad
        </p>
      </motion.div>

      {/* Interactive Games Grid */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-5'} mb-8`}>
        {GAMES.map((game, index) => (
          <motion.div
            key={game.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: game.delay }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative cursor-pointer p-4 rounded-2xl border transition-all duration-300 
              ${selectedGame === game.name 
                ? `border-[${game.color}] bg-gradient-to-br ${game.gradient} shadow-lg shadow-[${game.color}]/20` 
                : 'border-slate-700/50 hover:border-slate-600 bg-slate-800/50'
              } backdrop-blur-sm`}
            onMouseEnter={() => setHoveredGame(game.name)}
            onMouseLeave={() => setHoveredGame(null)}
            onClick={() => setSelectedGame(selectedGame === game.name ? null : game.name)}
          >
            {/* Game Logo */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <img 
                  alt={game.alt}
                  loading="lazy"
                  className={`w-full h-full object-contain transition-all duration-500 
                    ${hoveredGame === game.name ? 'scale-110 brightness-110' : 'brightness-90'}
                    ${selectedGame === game.name ? 'brightness-110 drop-shadow-lg' : ''}
                  `}
                  src={game.logo}
                />
                
                {/* Glow effect on hover */}
                {hoveredGame === game.name && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 -z-10 blur-xl rounded-full"
                    style={{ backgroundColor: `${game.color}40` }}
                  />
                )}
              </div>

              {/* Game Name */}
              <span className={`text-sm font-medium text-center leading-tight transition-colors duration-300
                ${selectedGame === game.name ? 'text-white' : 'text-gray-300'}
                ${hoveredGame === game.name ? 'text-white' : ''}
              `}>
                {game.name}
              </span>

              {/* Active Players */}
              <div className="flex items-center gap-1.5">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: game.color }}
                />
                <span className="text-xs text-gray-400 font-medium">
                  {game.players}
                </span>
              </div>

              {/* Selection indicator */}
              {selectedGame === game.name && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: game.color }}
                >
                  ✓
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex items-center justify-between p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm font-medium">
              Total Players: <span className="text-white font-semibold">77,300+</span>
            </span>
          </div>
          <div className="w-px h-4 bg-slate-600" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#9b87f5] rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm font-medium">
              Active Hubs: <span className="text-white font-semibold">34</span>
            </span>
          </div>
        </div>

        {selectedGame && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-4 py-2 bg-[#9b87f5] hover:bg-[#8b75f5] text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Find Squad
          </motion.button>
        )}
      </motion.div>
    </div>
  );
});

GamesOverlay.displayName = 'GamesOverlay';
