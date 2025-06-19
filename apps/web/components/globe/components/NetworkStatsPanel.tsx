'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Globe, Zap, Activity } from 'lucide-react';

interface NetworkStatsPanelProps {
  totalPlayers: number;
  activeHubs: number;
  connectionStatus: 'Live' | 'Connecting' | 'Offline';
}

export const NetworkStatsPanel = React.memo(({
  totalPlayers,
  activeHubs,
  connectionStatus
}: NetworkStatsPanelProps) => {
  const [isOpen, setIsOpen] = useState(true); // Default open
  const [animatedPlayers, setAnimatedPlayers] = useState(totalPlayers);
  const [animatedHubs, setAnimatedHubs] = useState(activeHubs);

  // Animate numbers when they change
  useEffect(() => {
    const animateNumber = (start: number, end: number, setter: (val: number) => void) => {
      const duration = 1000; // 1 second
      const steps = 30;
      const stepValue = (end - start) / steps;
      let current = start;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += stepValue;
        
        if (step >= steps) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(Math.round(current));
        }
      }, duration / steps);
    };

    animateNumber(animatedPlayers, totalPlayers, setAnimatedPlayers);
  }, [totalPlayers]);

  useEffect(() => {
    animateNumber(animatedHubs, activeHubs, setAnimatedHubs);
  }, [activeHubs]);

  const animateNumber = (start: number, end: number, setter: (val: number) => void) => {
    const duration = 800;
    const steps = 25;
    const stepValue = (end - start) / steps;
    let current = start;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += stepValue;
      
      if (step >= steps) {
        setter(end);
        clearInterval(timer);
      } else {
        setter(Math.round(current));
      }
    }, duration / steps);
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'Live': return 'text-green-400';
      case 'Connecting': return 'text-yellow-400';
      case 'Offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'Live': return <Activity className="w-3 h-3 animate-pulse" />;
      case 'Connecting': return <Zap className="w-3 h-3 animate-spin" />;
      case 'Offline': return <Globe className="w-3 h-3" />;
      default: return <Globe className="w-3 h-3" />;
    }
  };

  return (
    <div className={`fixed top-20 right-0 z-40 transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-64'
    }`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white p-2 rounded-l-lg shadow-lg transition-all duration-200"
      >
        {isOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Stats Panel */}
      <div className="bg-gradient-to-b from-gray-900/95 to-black/95 border-l border-gray-700 p-4 w-64 rounded-l-xl shadow-2xl">
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center border-b border-gray-700 pb-3">
            <h2 className="text-lg font-bold text-white">noob.gg Gaming Network</h2>
          </div>

          {/* Total Players */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="text-blue-400" size={18} />
              <span className="text-sm font-medium text-gray-300">Total Players:</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              {animatedPlayers.toLocaleString()}
            </div>
          </div>

          {/* Active Hubs */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="text-purple-400" size={18} />
              <span className="text-sm font-medium text-gray-300">Active Hubs:</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">
              {animatedHubs}
            </div>
          </div>

          {/* Connection Status */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="text-green-400" size={18} />
              <span className="text-sm font-medium text-gray-300">Connections:</span>
            </div>
            <div className={`flex items-center gap-2 text-lg font-bold ${getStatusColor()}`}>
              {getStatusIcon()}
              <span>{connectionStatus}</span>
            </div>
          </div>

          {/* Live Indicator */}
          <div className="pt-3 border-t border-gray-700">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Real-time updates</span>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="pt-2 space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Latency:</span>
              <span className="text-green-400">12ms</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Uptime:</span>
              <span className="text-blue-400">99.9%</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Regions:</span>
              <span className="text-purple-400">Global</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

NetworkStatsPanel.displayName = 'NetworkStatsPanel';
