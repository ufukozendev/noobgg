"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Mic,
  MicOff,
  Crown,
  MessageCircle,
  Shield,
  Award,
  Star,
  Gem,
  Zap,
  Trophy,
  Target,
  Sparkles,
} from "lucide-react";

interface LobbyListItemProps {
  lobby: {
    id: number;
    game: { name: string; icon: string; logo?: string };
    owner: { username: string; avatar?: string };
    players?: Array<{
      id: string;
      username: string;
      avatar: string;
      level?: number;
      rank?: string;
    }>;
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

export function LobbyListItem({
  lobby,
  onJoin,
  onEdit,
  onDelete,
}: LobbyListItemProps) {
  const [imageError, setImageError] = useState(false);
  const isJoinable =
    lobby.status === "waiting" && lobby.currentSize < lobby.maxSize;

  // Map rank names to Lucide icons
  const getRankIcon = (rankName: string) => {
    const normalized = rankName.toLowerCase();
    if (normalized.includes("iron") || normalized.includes("bronze"))
      return Shield;
    if (normalized.includes("silver") || normalized.includes("gold"))
      return Award;
    if (normalized.includes("platinum") || normalized.includes("master"))
      return Star;
    if (normalized.includes("diamond") || normalized.includes("legendary"))
      return Gem;
    if (normalized.includes("ascendant") || normalized.includes("champion"))
      return Zap;
    if (normalized.includes("immortal") || normalized.includes("unreal"))
      return Trophy;
    if (normalized.includes("radiant")) return Sparkles;
    return Target; // fallback
  };

  const getRankColor = (rankName: string) => {
    const normalized = rankName.toLowerCase();
    if (normalized.includes("iron")) return "text-gray-500";
    if (normalized.includes("bronze")) return "text-orange-500";
    if (normalized.includes("silver")) return "text-gray-300";
    if (normalized.includes("gold") || normalized.includes("master"))
      return "text-yellow-500";
    if (normalized.includes("platinum") || normalized.includes("legendary"))
      return "text-cyan-400";
    if (normalized.includes("diamond")) return "text-blue-500";
    if (normalized.includes("ascendant") || normalized.includes("champion"))
      return "text-green-500";
    if (normalized.includes("immortal") || normalized.includes("unreal"))
      return "text-red-500";
    if (normalized.includes("radiant")) return "text-purple-500";
    return "text-gray-400";
  };

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
      case "waiting":
        return "bg-green-600";
      case "in-game":
        return "bg-yellow-600";
      case "full":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusText = () => {
    switch (lobby.status) {
      case "waiting":
        return "Waiting";
      case "in-game":
        return "In Game";
      case "full":
        return "Full";
      default:
        return "Unknown";
    }
  };
  return (
    <div className="relative group">
      {/* Subtle hover glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 via-white/2 to-white/5 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative bg-white/[0.01] backdrop-blur-2xl rounded-[16px] p-4 border border-white/8 hover:border-white/15 transition-all duration-300 group-hover:bg-white/[0.02]">        {/* Desktop View - Clean Layout with Bigger Avatars */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left Section: Game + Owner - More Space */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            {/* Game Icon + Info - Bigger */}
            <div className="flex items-center space-x-4 w-[240px] pl-2">
              <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-lg p-1.5 flex items-center justify-center border border-white/20">
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
              <div className="min-w-0">
                <h3 className="text-white font-medium text-base truncate">
                  {lobby.game.name}
                </h3>
                <p className="text-gray-400 text-sm truncate">{lobby.mode}</p>
              </div>
            </div>
            
            {/* Owner - Bigger */}
            <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-lg border border-white/10 w-[180px]">
              <Avatar className="w-7 h-7">
                <AvatarImage src={lobby.owner.avatar} />
                <AvatarFallback className="bg-black/40 text-white text-sm">
                  {lobby.owner.username[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-300 text-sm truncate max-w-[100px]">
                {lobby.owner.username}
              </span>
              <Crown className="w-5 h-5 text-yellow-500" />
            </div>
          </div>

          {/* Center Section: Players + Region - Bigger Avatars */}
          <div className="flex items-center space-x-8 px-4">
            {/* Players - Much Bigger Avatars */}
            <div className="w-[140px] flex items-center justify-center">
              {lobby.players && lobby.players.length > 0 ? (
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {lobby.players.slice(0, 3).map((player) => (
                      <Avatar key={player.id} className="w-8 h-8 border-2 border-gray-800">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback className="bg-black/50 text-white text-sm">
                          {player.username[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {lobby.players.length > 3 && (
                      <div className="w-8 h-8 bg-gray-700/80 rounded-full border-2 border-gray-800 flex items-center justify-center">
                        <span className="text-xs text-gray-300 font-medium">
                          +{lobby.players.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-white text-sm font-medium">
                    {lobby.currentSize}/{lobby.maxSize}
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-gray-400" />
                  <span className="text-white text-sm font-medium">
                    {lobby.currentSize}/{lobby.maxSize}
                  </span>
                </div>
              )}
            </div>

            {/* Region */}
            <div className="w-[100px] text-center">
              <span className="text-white text-sm font-medium">
                {lobby.region}
              </span>
            </div>
          </div>

          {/* Right Section: Rank Range + Status + Actions */}
          <div className="flex items-center space-x-6">
            {/* Rank Range */}
            <div className="w-[140px] flex items-center justify-center space-x-1">
              <div className="flex items-center space-x-1">
                {React.createElement(getRankIcon(lobby.minRank), {
                  className: `w-4 h-4 ${getRankColor(lobby.minRank)}`,
                })}
                <span className="text-white text-xs font-medium">
                  {lobby.minRank}
                </span>
              </div>
              <span className="text-gray-500 text-xs">-</span>
              <div className="flex items-center space-x-1">
                {React.createElement(getRankIcon(lobby.maxRank), {
                  className: `w-4 h-4 ${getRankColor(lobby.maxRank)}`,
                })}
                <span className="text-white text-xs font-medium">
                  {lobby.maxRank}
                </span>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="w-[80px] flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
              <span className="text-gray-400 text-xs">
                {getStatusText()}
              </span>
            </div>
            
            {/* Actions */}
            <div className="w-[120px] flex items-center justify-center space-x-2">
              {/* Mic Indicator */}
              {lobby.isMicRequired && (
                <Mic className="w-4 h-4 text-green-500" />
              )}
              
              {/* Join Button */}
              {isJoinable ? (
                <Button
                  size="sm"
                  onClick={() => onJoin(lobby.id)}
                  className="h-8 px-4 bg-blue-600/90 hover:bg-blue-700 text-white border-0 transition-all duration-200 rounded-lg text-sm font-medium"
                >
                  Join
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled
                  className="h-8 px-4 bg-gray-600/50 text-gray-400 border-0 rounded-lg text-sm"
                >
                  {lobby.status === "full" ? "Full" : "In Game"}
                </Button>
              )}
            </div>
          </div>
        </div>        {/* Mobile View - Clean Compact Layout with Bigger Avatars */}
        <div className="md:hidden space-y-3">
          {/* Top Row - Game + Status + Join */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-lg p-1.5 flex items-center justify-center border border-white/20">
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
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium text-base truncate">
                  {lobby.game.name}
                </h3>
                <p className="text-gray-400 text-sm truncate">{lobby.mode} • {lobby.region}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
              {isJoinable ? (
                <Button
                  size="sm"
                  onClick={() => onJoin(lobby.id)}
                  className="h-8 px-3 bg-blue-600/90 hover:bg-blue-700 text-white border-0 transition-all duration-200 rounded-lg text-sm font-medium"
                >
                  Join
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled
                  className="h-8 px-3 bg-gray-600/50 text-gray-400 border-0 rounded-lg text-sm"
                >
                  {lobby.status === "full" ? "Full" : "In Game"}
                </Button>
              )}
            </div>
          </div>

          {/* Bottom Row - Owner + Players + Rank Range + Mic */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            {/* Owner */}
            <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-2 py-1.5">
              <Avatar className="w-6 h-6">
                <AvatarImage src={lobby.owner.avatar} />
                <AvatarFallback className="bg-black/40 text-white text-xs">
                  {lobby.owner.username[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-300 text-xs truncate max-w-[70px]">
                {lobby.owner.username}
              </span>
              <Crown className="w-3 h-3 text-yellow-500" />
            </div>
            
            {/* Players - Bigger Avatars */}
            <div className="flex items-center space-x-2">
              {lobby.players && lobby.players.length > 0 ? (
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-1">
                    {lobby.players.slice(0, 2).map((player) => (
                      <Avatar key={player.id} className="w-6 h-6 border border-gray-700">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback className="bg-black/50 text-white text-xs">
                          {player.username[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {lobby.players.length > 2 && (
                      <div className="w-6 h-6 bg-gray-700/80 rounded-full border border-gray-700 flex items-center justify-center">
                        <span className="text-xs text-gray-300">
                          +{lobby.players.length - 2}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-white text-xs font-medium">
                    {lobby.currentSize}/{lobby.maxSize}
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-xs font-medium">
                    {lobby.currentSize}/{lobby.maxSize}
                  </span>
                </div>
              )}
            </div>

            {/* Rank Range */}
            <div className="flex items-center space-x-1 bg-white/5 rounded-lg px-2 py-1">
              <div className="flex items-center space-x-1">
                {React.createElement(getRankIcon(lobby.minRank), {
                  className: `w-3 h-3 ${getRankColor(lobby.minRank)}`,
                })}
                <span className="text-white text-xs">
                  {lobby.minRank}
                </span>
              </div>
              <span className="text-gray-500 text-xs">-</span>
              <div className="flex items-center space-x-1">
                {React.createElement(getRankIcon(lobby.maxRank), {
                  className: `w-3 h-3 ${getRankColor(lobby.maxRank)}`,
                })}
                <span className="text-white text-xs">
                  {lobby.maxRank}
                </span>
              </div>
            </div>
            
            {/* Mic */}
            <div>
              {lobby.isMicRequired && (
                <Mic className="w-4 h-4 text-green-500" />
              )}
            </div>
          </div>
        </div>        {/* Optional Note - Only show if critical */}
        {lobby.note && (
          <div className="mt-2 p-2 bg-black/20 backdrop-blur rounded-lg border border-white/10 text-xs text-gray-300">
            {lobby.note}
          </div>
        )}
      </div>
    </div>
  );
}
