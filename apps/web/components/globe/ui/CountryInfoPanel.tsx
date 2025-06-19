'use client';

import React from 'react';
import { Users, Globe } from 'lucide-react';
import { CountryData } from '../types';
import { formatCountryName, formatPopulation } from '../utils/helpers';

interface CountryInfoPanelProps {
  country: CountryData;
}

export const CountryInfoPanel = React.memo(({ country }: CountryInfoPanelProps) => {
  return (
    <div className="absolute bottom-20 left-4 right-4 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 bg-black/90 text-white rounded-xl p-3.5 sm:p-4 border border-purple-500/50 sm:w-80 sm:max-w-sm"
      style={{ touchAction: 'pan-y', boxShadow: '0 8px 32px rgba(123, 31, 162, 0.25)' }}>
      
      <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
        <div className="text-xl sm:text-2xl drop-shadow-glow">🌍</div>
        <div>
          <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {formatCountryName(country.name)}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: country.color, boxShadow: `0 0 5px ${country.color}` }}
            ></div>
            <span className="text-xs text-gray-300">{country.continent}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        <div className="bg-gradient-to-r from-purple-500/20 to-fuchsia-500/10 rounded-lg p-2.5 border border-purple-500/20">
          <div className="flex justify-between items-center">
            <span className="text-gray-200 flex items-center gap-1.5 text-xs sm:text-sm">
              <Users className="w-3 h-3 text-purple-300" />
              <span className="hidden sm:inline">Population</span>
              <span className="sm:hidden">Pop.</span>
            </span>
            <span className="bg-gradient-to-br from-purple-400 to-fuchsia-500 bg-clip-text text-transparent font-bold text-sm sm:text-base">
              {formatPopulation(country.population)}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-purple-500/20">
          <p className="text-gray-300 text-xs leading-relaxed flex items-start gap-1.5">
            <Globe className="w-3 h-3 mt-0.5 flex-shrink-0 text-blue-300" />
            Hover over countries for quick info, click for details!
          </p>
        </div>
      </div>
    </div>
  );
});

CountryInfoPanel.displayName = 'CountryInfoPanel';
