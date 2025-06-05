"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Gamepad2, 
  Monitor, 
  TrendingUp, 
  Star,
  BarChart3,
  Cpu,
  HardDrive,
  Keyboard,
  Mouse,
  Headphones,
  Zap,
  Award,
  Target,
  Timer,
  Users
} from 'lucide-react';
import type { UserProfile, FavoriteGame, PCHardware, GameStats } from '@/types/user-profile';
import { getUserLocale } from '@/lib/utils';

interface GamerExperienceTabProps {
  profile: UserProfile;
  favoriteGames: FavoriteGame[];
  pcHardware: PCHardware[];
  locale?: string;
}

export function GamerExperienceTab({ 
  profile, 
  favoriteGames, 
  pcHardware, 
  locale 
}: GamerExperienceTabProps) {
  const [userLocale, setUserLocale] = useState<string>('en-US');

  useEffect(() => {
    const dynamicLocale = locale || getUserLocale();
    setUserLocale(dynamicLocale);
  }, [locale]);

  const formatNumber = (num: number) => {
    return num.toLocaleString(userLocale);
  };

  const formatHours = (hours: number) => {
    if (hours >= 1000) {
      return `${(hours / 1000).toFixed(1)}K hours`;
    }
    return `${hours} hours`;
  };

  const getComponentIcon = (component: string) => {
    switch (component) {
      case 'cpu': return <Cpu className="w-5 h-5" />;
      case 'gpu': return <Monitor className="w-5 h-5" />;
      case 'ram': case 'storage': return <HardDrive className="w-5 h-5" />;
      case 'keyboard': return <Keyboard className="w-5 h-5" />;
      case 'mouse': return <Mouse className="w-5 h-5" />;
      case 'headset': return <Headphones className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const getWinRateColor = (winRate: number) => {
    if (winRate >= 70) return 'text-green-600 bg-green-50';
    if (winRate >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRankBadgeColor = (rank: string) => {
    const rankLower = rank.toLowerCase();
    if (rankLower.includes('grandmaster') || rankLower.includes('challenger')) return 'bg-purple-100 text-purple-800 border-purple-300';
    if (rankLower.includes('master') || rankLower.includes('immortal')) return 'bg-red-100 text-red-800 border-red-300';
    if (rankLower.includes('diamond')) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (rankLower.includes('platinum') || rankLower.includes('emerald')) return 'bg-teal-100 text-teal-800 border-teal-300';
    if (rankLower.includes('gold')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (rankLower.includes('silver')) return 'bg-gray-100 text-gray-800 border-gray-300';
    return 'bg-amber-100 text-amber-800 border-amber-300';
  };

  return (
    <div className="space-y-6">
      {/* Gaming Overview */}
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-center space-x-2 mb-4">
          <Gamepad2 className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Gaming Overview</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{favoriteGames.length}</div>
            <div className="text-sm text-muted-foreground">Active Games</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {formatHours(favoriteGames.reduce((total, game) => total + game.stats.hoursPlayed, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Total Hours</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {favoriteGames.length > 0 
                ? Math.round(favoriteGames.reduce((total, game) => total + game.stats.winRate, 0) / favoriteGames.length)
                : 0}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Win Rate</div>
          </div>
        </div>
      </div>

      {/* Favorite Games */}
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold">Favorite Games</h3>
          </div>
        </div>
        
        {favoriteGames.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No favorite games added yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteGames.map((game) => (
              <div key={game.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  {game.iconUrl ? (
                    <img
                      src={game.iconUrl}
                      alt={game.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Gamepad2 className="w-8 h-8 text-white" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-lg">{game.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRankBadgeColor(game.stats.rank)}`}>
                        {game.stats.rank}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Platform:</span>
                        <span className="font-medium">{game.platform}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Hours Played:</span>
                        <span className="font-medium">{formatHours(game.stats.hoursPlayed)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Win Rate:</span>
                        <span className={`font-medium px-2 py-1 rounded ${getWinRateColor(game.stats.winRate)}`}>
                          {game.stats.winRate}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Rating:</span>
                        <span className="font-medium">{formatNumber(game.stats.rating)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Games:</span>
                        <span className="font-medium">{formatNumber(game.stats.totalGames)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PC Hardware Showcase */}
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-center space-x-2 mb-4">
          <Monitor className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold">PC Hardware Showcase</h3>
        </div>
        
        {pcHardware.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No hardware information added yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pcHardware.map((hardware) => (
              <div key={hardware.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  {getComponentIcon(hardware.component)}
                  <div className="flex-1">
                    <h4 className="font-medium capitalize">{hardware.component}</h4>
                    <p className="text-sm text-muted-foreground">{hardware.brand}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium text-sm">{hardware.model}</p>
                  {hardware.imageUrl && (
                    <img
                      src={hardware.imageUrl}
                      alt={`${hardware.brand} ${hardware.model}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gaming Performance Stats */}
      {favoriteGames.length > 0 && (
        <div className="bg-card rounded-lg p-6 border">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold">Performance Statistics</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Wins */}
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {formatNumber(favoriteGames.reduce((total, game) => 
                  total + Math.round(game.stats.totalGames * game.stats.winRate / 100), 0
                ))}
              </div>
              <div className="text-sm text-green-700">Total Wins</div>
            </div>

            {/* Best Win Rate */}
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {Math.max(...favoriteGames.map(game => game.stats.winRate))}%
              </div>
              <div className="text-sm text-blue-700">Best Win Rate</div>
            </div>

            {/* Most Played */}
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <Timer className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {favoriteGames.length > 0 ? favoriteGames.reduce((prev, current) => 
                  prev.stats.hoursPlayed > current.stats.hoursPlayed ? prev : current
                ).name.split(' ')[0] : 'N/A'}
              </div>
              <div className="text-sm text-purple-700">Most Played</div>
            </div>

            {/* Total Games */}
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">
                {formatNumber(favoriteGames.reduce((total, game) => total + game.stats.totalGames, 0))}
              </div>
              <div className="text-sm text-orange-700">Total Games</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 