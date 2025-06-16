'use client';

import React, { useState } from 'react';
import { Users, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { MAJOR_CITIES } from '../data/cities';

interface StatsOverlayProps {
  isMobile: boolean;
  totalPlayers: number;
  activeHubs: number;
  connectionStatus: 'Live' | 'Connecting' | 'Offline';
}

export const StatsOverlay = React.memo(({ 
  isMobile, 
  totalPlayers, 
  activeHubs, 
  connectionStatus
}: StatsOverlayProps) => {
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'Live': return 'text-green-400';
      case 'Connecting': return 'text-yellow-400';
      case 'Offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };  return (    <div className={`absolute transition-all duration-300 ease-out
      ${isMobile
        ? 'top-4 left-4 right-4 p-3'
        : 'top-6 left-6 p-3 w-[280px]'
      }`}style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 16px rgba(255, 255, 255, 0.1) inset',
      }}>{/* Header with toggle */}
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(59, 130, 246, 0.8))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}>
            <img 
              src="/noobgg-logo.png" 
              alt="noob.gg" 
              className="w-4 h-4 object-contain"
            />
          </div>        
          <div>
            <h2 className="text-white font-semibold text-sm tracking-tight">noob.gg</h2>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">Live</span>
            </div>
          </div>
        </div>
        
        <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/10"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}>
          {isExpanded ? (
            <ChevronUp className="w-3 h-3 text-white/70" />
          ) : (
            <ChevronDown className="w-3 h-3 text-white/70" />
          )}
        </div>
      </div>      {/* Stats Grid - Collapsible */}
      {isExpanded && (
        <div className="space-y-2.5 mt-4 animate-in slide-in-from-top-2 duration-200">        {/* Total Players */}
        <div className="flex items-center justify-between p-2.5 rounded-lg transition-all duration-200 hover:bg-white/5"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
                border: '1px solid rgba(59, 130, 246, 0.4)',
              }}>
              <Users className="w-3 h-3 text-blue-300" />
            </div>
            <span className="text-white/70 text-xs font-medium">Players</span>
          </div>
          <span className="text-white font-bold text-sm font-mono tracking-wider">
            {totalPlayers.toLocaleString()}
          </span>
        </div>        {/* Active Hubs */}
        <div className="flex items-center justify-between p-2.5 rounded-lg transition-all duration-200 hover:bg-white/5"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
                border: '1px solid rgba(168, 85, 247, 0.4)',
              }}>
              <MapPin className="w-3 h-3 text-purple-300" />
            </div>
            <span className="text-white/70 text-xs font-medium">Hubs</span>
          </div>
          <span className="text-white font-bold text-sm font-mono tracking-wider">{activeHubs}</span>
        </div>        {/* Connections */}
        <div className="flex items-center justify-between p-2.5 rounded-lg transition-all duration-200 hover:bg-white/5"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(16, 185, 129, 0.3))',
                border: '1px solid rgba(34, 197, 94, 0.4)',
              }}>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-white/70 text-xs font-medium">Status</span>
          </div>
          <span className={`font-bold text-sm tracking-wider ${getStatusColor()}`}>{connectionStatus}</span>
        </div>
        </div>
      )}

      {/* Subtle bottom glow */}
      <div 
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-4 opacity-30 blur-xl"
        style={{
          background: 'linear-gradient(90deg, rgba(147, 51, 234, 0.5), rgba(59, 130, 246, 0.5))',
        }}
      ></div>
    </div>
  );
});

StatsOverlay.displayName = 'StatsOverlay';
