'use client';

import React from 'react';
import { Users, MapPin, Globe, Gamepad2 } from 'lucide-react';
import { MAJOR_CITIES } from '../data/cities';

interface StatsOverlayProps {
  isMobile: boolean;
  totalPlayers: number;
}

export const StatsOverlay = React.memo(({ isMobile, totalPlayers }: StatsOverlayProps) => {
  return (
    <div className={`absolute transition-all duration-200 bg-black/80 backdrop-blur-lg rounded-xl border border-purple-500/40 shadow-xl 
      ${isMobile
        ? 'top-2 left-2 right-2 p-3'
        : 'top-3 left-3 p-4 rounded-xl max-w-[280px]'
      }`}
      style={{ touchAction: 'pan-y', boxShadow: '0 4px 30px rgba(123, 31, 162, 0.15)' }}>

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center">
          <Globe className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-semibold text-sm">noob.gg Gaming Network</span>
      </div>

      {/* Stats Grid */}
      <div className="space-y-3">
        {/* Total Players */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-sm">Total Players:</span>
          </div>
          <span className="text-blue-400 font-bold text-lg">
            {totalPlayers.toLocaleString()}
          </span>
        </div>

        {/* Active Hubs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300 text-sm">Active Hubs:</span>
          </div>
          <span className="text-purple-400 font-bold text-lg">{MAJOR_CITIES.length}</span>
        </div>

        {/* Connections */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-gray-300 text-sm">Connections:</span>
          </div>
          <span className="text-green-400 font-bold text-lg">Live</span>
        </div>
      </div>
    </div>
  );
});

StatsOverlay.displayName = 'StatsOverlay';
