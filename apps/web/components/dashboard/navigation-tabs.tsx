"use client";

import React, { useState } from 'react';
import { Grid3X3, List, Search, Clock, Users, Shield, Trophy, Menu, X } from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
      <>
        <div className={cn(
          'bg-white/[0.02] backdrop-blur-3xl  p-0 md:p-1 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
          {
            'rounded-b-[0px] !rounded-t-[20px] mb-0': isMenuOpen,
            'rounded-[20px] mb-6': !isMenuOpen,
          }
        )}>
          <div className={`hidden md:flex items-center`}>
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
          <div className={cn(
            "flex md:hidden items-center justify-between p-4 gap-2"
          )}>
            <div className="">{tabConfig[activeTab as keyof typeof tabConfig].label}</div>
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div >
        <div className={cn(
          "flex flex-col gap-2 space-x-2 p-4  rounded-[16px] transition-all duration-300 text-sm font-medium",
          "bg-white/[0.02] backdrop-blur-3xl  border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
          isMenuOpen ? "flex" : "hidden",
          {
            'rounded-t-[0px] border-t-0  mb-6': isMenuOpen,
            'rounded-[20px] mb-0': !isMenuOpen,
          },
        )}>
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
      </>
    );
  }

  return null;
}
