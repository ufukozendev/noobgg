"use client";

import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Clock, 
  Gamepad2, 
  Trophy, 
  BarChart3, 
  Users, 
  Users2, 
  Video, 
  Image 
} from 'lucide-react';
import type { ProfileTabType } from '@/types/user-profile';

interface ProfileNavigationProps {
  activeTab: ProfileTabType;
  onTabChange: (tab: ProfileTabType) => void;
}

const tabs = [
  { id: 'about' as ProfileTabType, label: 'About', icon: User },
  { id: 'timeline' as ProfileTabType, label: 'Timeline', icon: Clock },
  { id: 'gaming-gear' as ProfileTabType, label: 'Gaming Gear', icon: Gamepad2 },
  { id: 'gaming-experience' as ProfileTabType, label: 'Gaming Experience', icon: Trophy },
  { id: 'gaming-stats' as ProfileTabType, label: 'Gaming Stats', icon: BarChart3 },
  { id: 'friends' as ProfileTabType, label: 'Friends', icon: Users },
  { id: 'groups' as ProfileTabType, label: 'Groups', icon: Users2 },
  { id: 'videos' as ProfileTabType, label: 'Videos', icon: Video },
  { id: 'photos' as ProfileTabType, label: 'Photos', icon: Image },
];

export function ProfileNavigation({ activeTab, onTabChange }: ProfileNavigationProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as ProfileTabType)}>
          <TabsList className="h-auto p-0 bg-transparent">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </div>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
} 