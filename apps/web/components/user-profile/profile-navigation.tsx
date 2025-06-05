"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Clock, 
  Trophy, 
  Gamepad2, 
  Users, 
  Image,
  Star,
  Award
} from 'lucide-react';
import type { ProfileTabType } from '@/types/user-profile';

interface ProfileNavigationProps {
  activeTab: ProfileTabType;
  onTabChange: (tab: ProfileTabType) => void;
}

const tabs = [
  { id: 'about' as ProfileTabType, label: 'About', icon: User },
  { id: 'professional' as ProfileTabType, label: 'Professional', icon: Award },
  { id: 'gamer-experience' as ProfileTabType, label: 'Gamer Experience', icon: Gamepad2 },
  { id: 'timeline' as ProfileTabType, label: 'Timeline', icon: Clock },
  { id: 'media' as ProfileTabType, label: 'Media', icon: Image },
  { id: 'friends' as ProfileTabType, label: 'Friends', icon: Users },
  { id: 'reviews' as ProfileTabType, label: 'Reviews', icon: Star },
];

export function ProfileNavigation({ activeTab, onTabChange }: ProfileNavigationProps) {
  return (
    <div className="w-16 hover:w-64 transition-all duration-300 ease-in-out min-h-screen bg-card border-r p-2 hover:p-4 space-y-2 group overflow-hidden">
      <div className="mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-semibold text-foreground mb-2 whitespace-nowrap">The TABS of LEFT SIDE!!</h3>
        <div className="w-12 h-1 bg-primary rounded"></div>
      </div>
      
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <Button
            key={tab.id}
            variant={isActive ? "default" : "ghost"}
            onClick={() => onTabChange(tab.id)}
            className={`w-full justify-start space-x-3 py-3 h-auto text-left relative group/item ${
              isActive 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
              {tab.label}
            </span>
          </Button>
        );
      })}
      
      {/* Additional sidebar content */}
      <div className="mt-8 pt-6 border-t space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="whitespace-nowrap">Newsfeed/Timeline</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="whitespace-nowrap">Groups</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="whitespace-nowrap">Events</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="whitespace-nowrap">Gamer Search/Find</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="whitespace-nowrap">Games etc.</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="whitespace-nowrap">Roadmap/Feedback</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="whitespace-nowrap">and TBA.</span>
          </div>
        </div>
      </div>
    </div>
  );
} 