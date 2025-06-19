'use client';

import React from 'react';
import { Users, Gamepad2 } from 'lucide-react';
import { CityData } from '../types';

interface CityModalProps {
  city: CityData;
  onClose: () => void;
}

export const CityModal = React.memo(({ city, onClose }: CityModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-black/95 text-white rounded-2xl p-6 border border-purple-500/50 w-full max-w-md sm:max-w-lg"
        style={{ boxShadow: '0 20px 40px rgba(123, 31, 162, 0.4)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl drop-shadow-glow">🎮</div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {city.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-purple-300 font-medium">Gaming Hub</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-300" />
              <span className="text-sm text-gray-300">Active Players</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-br from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
              {Math.floor(city.population / 100)}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Gamepad2 className="w-5 h-5 text-blue-300" />
              <span className="text-sm text-gray-300">Popular Games</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              3
            </div>
          </div>
        </div>

        {/* Popular Games List */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Gamepad2 className="w-4 h-4 text-purple-300" />
            <span className="text-sm text-gray-300 font-medium">Popular Games</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-purple-500/20">
              <span className="text-white font-medium">CS2</span>
              <span className="text-purple-300 text-sm font-bold">#1</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg border border-blue-500/20">
              <span className="text-white font-medium">LOL</span>
              <span className="text-blue-300 text-sm font-bold">#2</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/20">
              <span className="text-white font-medium">Valorant</span>
              <span className="text-green-300 text-sm font-bold">#3</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-fuchsia-600 transition-all transform hover:scale-105"
            style={{ boxShadow: '0 4px 15px rgba(123, 31, 162, 0.3)' }}
          >
            Join Hub
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 border border-gray-500 text-gray-300 font-semibold rounded-lg hover:bg-white/10 hover:border-gray-400 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

CityModal.displayName = 'CityModal';
