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
      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 via-white/2 to-white/5 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>{" "}
      <div className="relative bg-white/[0.01] backdrop-blur-2xl rounded-[16px] p-4 border border-white/8 hover:border-white/15 transition-all duration-300 group-hover:bg-white/[0.02]">
        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-12 gap-4 items-center">
          {/* Game - Col 1-3 */}{" "}
          <div className="col-span-3 flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/10 backdrop-blur rounded-[12px] p-1.5 flex items-center justify-center border border-white/20">
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
              <h3 className="text-white font-medium text-sm truncate">
                {lobby.game.name}
              </h3>
              <p className="text-gray-400 text-sm truncate">{lobby.mode}</p>
            </div>
          </div>{" "}
          {/* Owner - Col 4-5 */}
          <div className="col-span-2 flex items-center space-x-2 min-w-0">
            <Avatar className="w-6 h-6 border border-white/20">
              <AvatarImage src={lobby.owner.avatar} />
              <AvatarFallback className="bg-black/20 backdrop-blur text-white text-sm border border-white/20">
                {lobby.owner.username[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-gray-300 text-sm truncate">
              {lobby.owner.username}
            </span>
            <Crown className="w-5 h-5 text-yellow-400/80 flex-shrink-0" />
          </div>{" "}
          {/* Players - Col 6 */}
          <div className="col-span-1 flex items-center justify-center space-x-1">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-white text-sm font-medium">
              {lobby.currentSize}/{lobby.maxSize}
            </span>
          </div>{" "}
          {/* Region - Col 7 */}
          <div className="col-span-1 text-center">
            <span className="text-white text-sm font-medium">
              {lobby.region}
            </span>
          </div>{" "}
          {/* Rank Range - Col 8-9 */}
          <div className="col-span-2 flex flex-col items-center justify-center space-y-1">
            {/* Min Rank */}
            <div className="flex items-center space-x-1.5">
              {React.createElement(getRankIcon(lobby.minRank), {
                className: `w-4 h-4 ${getRankColor(lobby.minRank)}`,
              })}
              <span className="text-white text-xs font-medium leading-tight truncate">
                {lobby.minRank}
              </span>
            </div>
            {/* Max Rank */}
            <div className="flex items-center space-x-1.5">
              {React.createElement(getRankIcon(lobby.maxRank), {
                className: `w-4 h-4 ${getRankColor(lobby.maxRank)}`,
              })}
              <span className="text-gray-400 text-xs leading-tight truncate">
                {lobby.maxRank}
              </span>
            </div>
          </div>{" "}
          {/* Status - Col 10 */}
          <div className="col-span-1 flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
            <span className="text-gray-300 text-sm">
              {getStatusText()}
            </span>{" "}
          </div>
          {/* Actions - Col 11-12 */}
          <div className="col-span-2 flex items-center justify-end space-x-2">
            {" "}
            {lobby.isMicRequired ? (
              <Mic className="w-5 h-5 text-green-500" />
            ) : (
              <MicOff className="w-5 h-5 text-gray-500" />
            )}
            {/* Comment icon with hover tooltip */}
            {lobby.note && (
              <div className="relative group/note">
                <MessageCircle className="w-5 h-5 text-blue-400 cursor-help" />
                <div className="absolute bottom-6 right-0 bg-black/90 backdrop-blur border border-white/20 rounded-lg p-2 text-sm text-gray-300 max-w-xs opacity-0 group-hover/note:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  {lobby.note}
                  <div className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-black/90"></div>
                </div>
              </div>
            )}
            {isJoinable ? (
              <Button
                size="sm"
                onClick={() => onJoin(lobby.id)}
                className="h-9 px-4 bg-blue-600/80 backdrop-blur hover:bg-blue-700/90 text-white border border-blue-500/30 transition-all duration-300 rounded-[12px] text-sm font-medium"
              >
                Join
              </Button>
            ) : (
              <Button
                size="sm"
                disabled
                className="h-9 px-4 bg-gray-600/50 backdrop-blur text-gray-400 border border-gray-500/30 rounded-[12px] text-sm"
              >
                {lobby.status === "full" ? "Full" : "In Game"}
              </Button>
            )}
          </div>
        </div>
        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {/* Top Row - Game, Status and Join Button */}
          <div className="flex items-center justify-between">
            {/* Game */}
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-[12px] p-1.5 flex items-center justify-center border border-white/20">
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
                <h3 className="text-white font-medium text-sm truncate">
                  {lobby.game.name}
                </h3>
                <p className="text-gray-400 text-sm truncate">{lobby.mode}</p>
              </div>
            </div>

            {/* Status and Join Button */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
                <span className="text-gray-300 text-xs hidden sm:inline">
                  {getStatusText()}
                </span>
              </div>
              {isJoinable ? (
                <Button
                  size="sm"
                  onClick={() => onJoin(lobby.id)}
                  className="h-9 px-3 bg-blue-600/80 backdrop-blur hover:bg-blue-700/90 text-white border border-blue-500/30 transition-all duration-300 rounded-[12px] text-sm font-medium"
                >
                  Join
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled
                  className="h-9 px-3 bg-gray-600/50 backdrop-blur text-gray-400 border border-gray-500/30 rounded-[12px] text-sm"
                >
                  {lobby.status === "full" ? "Full" : "In Game"}
                </Button>
              )}
            </div>
          </div>

          {/* Middle Row - Owner, Players, Region, Mic */}
          <div className="flex items-center justify-between">
            {/* Owner */}
            <div className="flex items-center space-x-1.5 min-w-0 flex-1">
              <Avatar className="w-5 h-5 border border-white/20">
                <AvatarImage src={lobby.owner.avatar} />
                <AvatarFallback className="bg-black/20 backdrop-blur text-white text-xs border border-white/20">
                  {lobby.owner.username[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-300 text-xs truncate max-w-[80px]">
                {lobby.owner.username}
              </span>
              <Crown className="w-4 h-4 text-yellow-400/80 flex-shrink-0" />
            </div>

            {/* Players */}
            <div className="flex items-center space-x-1 mr-3">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-white text-xs font-medium">
                {lobby.currentSize}/{lobby.maxSize}
              </span>
            </div>

            {/* Region */}
            <div className="mr-3">
              <span className="text-white text-xs font-medium">
                {lobby.region}
              </span>
            </div>

            {/* Mic */}
            <div>
              {lobby.isMicRequired ? (
                <Mic className="w-4 h-4 text-green-500" />
              ) : (
                <MicOff className="w-4 h-4 text-gray-500" />
              )}
            </div>
          </div>

          {/* Rank Range Row */}
          <div className="flex items-center justify-between border-t border-white/10 pt-2">
            <div className="text-gray-400 text-xs">Rank Range:</div>
            <div className="flex items-center space-x-3">
              {/* Min Rank */}
              <div className="flex items-center space-x-1.5">
                {React.createElement(getRankIcon(lobby.minRank), {
                  className: `w-4 h-4 ${getRankColor(lobby.minRank)}`,
                })}
                <span className="text-white text-xs font-medium leading-tight">
                  {lobby.minRank}
                </span>
              </div>
              <span className="text-gray-500">-</span>
              {/* Max Rank */}
              <div className="flex items-center space-x-1.5">
                {React.createElement(getRankIcon(lobby.maxRank), {
                  className: `w-4 h-4 ${getRankColor(lobby.maxRank)}`,
                })}
                <span className="text-white text-xs font-medium leading-tight">
                  {lobby.maxRank}
                </span>
              </div>
            </div>
          </div>

          {/* Note (if exists) */}
          {lobby.note && (
            <div className="border-t border-white/10 pt-2">
              <div className="text-gray-400 text-xs mb-1">Note:</div>
              <div className="bg-black/30 backdrop-blur border border-white/10 rounded-lg p-2 text-xs text-gray-300">
                {lobby.note}
              </div>
            </div>
          )}

          {/* Created Time */}
          <div className="text-gray-400 text-xs">
            Created: {formatTimeAgo(lobby.createdAt)}
          </div>
        </div>

        {/* Tags - Always visible */}
        {lobby.tags && lobby.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {lobby.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-black/20 backdrop-blur text-gray-300 text-sm border border-white/10 px-2 py-1 rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
