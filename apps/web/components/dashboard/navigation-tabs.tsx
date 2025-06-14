"use client";

import React from 'react';
import { Grid3X3, List, Search, Clock, Users, Shield, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  type?: 'tabs' | 'view';
}

const tabConfig = {
  find: { icon: Search, label: 'Find Lobbies' },
  open: { icon: Clock, label: 'Open Lobbies' },
  groups: { icon: Users, label: 'Groups' },
  clans: { icon: Shield, label: 'Clans' },
  tournaments: { icon: Trophy, label: 'Tournaments' }
};

export function NavigationTabs({ 
  activeTab, 
  onTabChange, 
  viewMode, 
  onViewModeChange, 
  type = 'tabs' 
}: NavigationTabsProps) {
  if (type === 'view' && viewMode && onViewModeChange) {
    return (
      <div className="flex items-center bg-white/[0.02] backdrop-blur-3xl rounded-[20px] p-1 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
        <button
          onClick={() => onViewModeChange('grid')}
          className={cn(
            "flex items-center space-x-2 px-4 py-2.5 rounded-[16px] transition-all duration-300 text-sm font-medium",
            viewMode === 'grid'
              ? "bg-white/10 backdrop-blur text-white shadow-lg border border-white/20"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          <Grid3X3 className="w-4 h-4" />
          <span>Grid</span>
        </button>
        
        <button
          onClick={() => onViewModeChange('list')}
          className={cn(
            "flex items-center space-x-2 px-4 py-2.5 rounded-[16px] transition-all duration-300 text-sm font-medium",
            viewMode === 'list'
              ? "bg-white/10 backdrop-blur text-white shadow-lg border border-white/20"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          <List className="w-4 h-4" />
          <span>List</span>
        </button>
      </div>
    );
  }

  if (type === 'tabs' && activeTab && onTabChange) {
    return (
      <div className="flex items-center bg-white/[0.02] backdrop-blur-3xl rounded-[20px] p-1 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] mb-6">
        {Object.entries(tabConfig).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2.5 rounded-[16px] transition-all duration-300 text-sm font-medium",
                activeTab === key
                  ? "bg-white/10 backdrop-blur text-white shadow-lg border border-white/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{config.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return null;
}
