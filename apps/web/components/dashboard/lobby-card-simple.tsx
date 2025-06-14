"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Mic, 
  MicOff, 
  Crown,
  Clock
} from 'lucide-react';

interface LobbyCardSimpleProps {
  lobby: {
    id: number;
    game: { name: string; icon: string; logo?: string };
    owner: { username: string; avatar?: string };
    mode: string;
    region: string;
    currentSize: number;
    maxSize: number;
    minRank: string;
    maxRank: string;
    isMicRequired: boolean;
    type: "public" | "private";
    status: "waiting" | "in-game" | "full";
    note?: string;
    createdAt: string;
    tags?: string[];
  };
  onJoin: (lobbyId: number) => void;
  onEdit: (lobbyId: number) => void;
  onDelete: (lobbyId: number) => void;
}

export function LobbyCardSimple({ lobby, onJoin, onEdit, onDelete }: LobbyCardSimpleProps) {
  const [imageError, setImageError] = useState(false);
  const isJoinable = lobby.status === 'waiting' && lobby.currentSize < lobby.maxSize;
  
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getStatusColor = () => {
    switch (lobby.status) {
      case 'waiting': return 'bg-green-600';
      case 'in-game': return 'bg-yellow-600';
      case 'full': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };  return (
    <div className="relative group h-full">
      {/* Glassmorphism glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-[24px] blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/[0.02] backdrop-blur-3xl rounded-[24px] p-6 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)] transition-all duration-500 group-hover:bg-white/[0.03] h-full min-h-[420px] flex flex-col">
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.01] rounded-[24px] pointer-events-none"></div>
        
        <div className="relative z-10 flex-1 flex flex-col">          {/* Header */}
          <div className="flex items-center justify-between mb-4 flex-shrink-0">            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-[16px] p-1.5 flex items-center justify-center border border-white/20">
                {!imageError ? (
                  <img 
                    src={lobby.game.icon} 
                    alt={lobby.game.name}
                    className="w-full h-full object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <span className="text-sm font-bold text-white">
                    {lobby.game.name[0]}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-white font-medium">{lobby.game.name}</h3>
                <p className="text-gray-400 text-sm">{lobby.mode}</p>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${getStatusColor()} shadow-lg`}></div>
          </div>          {/* Owner */}
          <div className="flex items-center space-x-2 mb-4 flex-shrink-0">
            <Avatar className="w-6 h-6 border border-white/20">
              <AvatarImage src={lobby.owner.avatar} />
              <AvatarFallback className="bg-black/20 backdrop-blur text-white text-xs border border-white/20">
                {lobby.owner.username[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-gray-300 text-sm">{lobby.owner.username}</span>
            <Crown className="w-4 h-4 text-yellow-400/80" />
          </div>          {/* Details */}
          <div className="space-y-3 mb-5 flex-shrink-0">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Players</span>
              <div className="flex items-center space-x-1 text-white">
                <Users className="w-4 h-4" />
                <span>{lobby.currentSize}/{lobby.maxSize}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Region</span>
              <span className="text-white">{lobby.region}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Rank</span>
              <span className="text-white">{lobby.minRank} - {lobby.maxRank}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Mic</span>
              {lobby.isMicRequired ? (
                <Mic className="w-4 h-4 text-green-500" />
              ) : (
                <MicOff className="w-4 h-4 text-gray-500" />
              )}
            </div>
          </div>

          {/* Flexible content area */}
          <div className="flex-grow flex flex-col justify-start">
            {/* Note */}
            {lobby.note && (
              <div className="mb-4 p-3 bg-black/20 backdrop-blur rounded-[16px] border-l-4 border-blue-500/50">
                <p className="text-gray-300 text-sm">{lobby.note}</p>
              </div>
            )}

            {/* Tags */}
            {lobby.tags && lobby.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {lobby.tags.map((tag, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="bg-black/20 backdrop-blur text-gray-300 text-xs border border-white/10 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-auto flex-shrink-0">
            <div className="flex items-center space-x-1 text-gray-400 text-xs">
              <Clock className="w-3 h-3" />
              <span>{formatTimeAgo(lobby.createdAt)}</span>
            </div>
            
            <div className="flex space-x-2">
              {isJoinable ? (
                <Button
                  size="sm"
                  onClick={() => onJoin(lobby.id)}
                  className="bg-blue-600/80 backdrop-blur hover:bg-blue-700/90 text-white border border-blue-500/30 transition-all duration-300 rounded-[16px] shadow-lg hover:shadow-blue-500/25"
                >
                  Join
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled
                  className="bg-gray-600/50 backdrop-blur text-gray-400 border border-gray-500/30 rounded-[16px]"
                >
                  {lobby.status === 'full' ? 'Full' : 'In Game'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
