"use client";

import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  UserPlus, 
  MapPin, 
  Calendar,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageSquare,
  Twitch
} from 'lucide-react';
import type { UserProfile, ProfileStats, SocialLink } from '@/types/user-profile';
import { getStatusIndicatorClass, getUserLocale } from '@/lib/utils';

interface ProfileHeaderProps {
  profile: UserProfile;
  stats: ProfileStats;
  socialLinks: SocialLink[];
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
  locale?: string;
}

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  discord: MessageSquare,
  twitch: Twitch,
};

export function ProfileHeader({
  profile,
  stats,
  socialLinks,
  isOwnProfile = false,
  isFollowing = false,
  onFollow,
  onMessage,
  locale,
}: ProfileHeaderProps) {
  const [userLocale, setUserLocale] = useState<string>('en-US');

  useEffect(() => {
    // Get user locale dynamically
    const dynamicLocale = locale || getUserLocale();
    setUserLocale(dynamicLocale);
  }, [locale]);
  const getInitials = (firstName: string | null, lastName: string | null, userName: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return userName[0]?.toUpperCase() || 'U';
  };

  const formatRegion = (region: string) => {
    return region.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getActualStatus = () => {
    // If currentStatus is explicitly set, use it
    if (profile.currentStatus) {
      return profile.currentStatus;
    }
    
    // Otherwise, determine status based on lastOnline
    const lastOnlineDate = new Date(profile.lastOnline);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - lastOnlineDate.getTime()) / (1000 * 60));
    
    // Consider user online if they were active within the last 5 minutes
    return diffInMinutes <= 5 ? 'online' : 'offline';
  };

  return (
    <div className="relative bg-card">
      {/* Main Profile Section */}
      <div className="flex items-start justify-between p-6">
        {/* Left Side - Avatar and Info */}
        <div className="flex items-start space-x-6">
          {/* Hexagon Avatar */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg">
              <div className="w-28 h-28 rounded-xl overflow-hidden transform -rotate-12">
                {profile.profileImageUrl ? (
                  <img
                    src={profile.profileImageUrl}
                    alt={profile.userName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {getInitials(profile.firstName, profile.lastName, profile.userName)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Status Indicator */}
            <div 
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white ${getStatusIndicatorClass(getActualStatus())}`}
              title={`Currently ${getActualStatus().replace('_', ' ')}`}
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            {/* Stats Row */}
            <div className="flex items-center space-x-6 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.posts}</div>
                <div className="text-xs text-muted-foreground">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.followers}</div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Name and Username */}
            <div className="mb-3">
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-2xl font-bold">
                  {profile.firstName && profile.lastName 
                    ? `${profile.firstName} ${profile.lastName}` 
                    : profile.userName}
                </h1>
                {profile.nickname && (
                  <span className="text-xl text-blue-600 font-medium">
                    "{profile.nickname}"
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">@{profile.userName}</p>
            </div>

            {/* Gaming Info */}
            <div className="space-y-2 mb-4">
              {profile.club && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-600">{profile.club}</span>
                </div>
              )}
              {profile.tagline && (
                <div className="text-sm text-muted-foreground">{profile.tagline}</div>
              )}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getStatusIndicatorClass(getActualStatus())}`} />
                <span className="text-sm text-muted-foreground capitalize">
                  {getActualStatus() === 'in-game' ? 'Currently In-Game' : 
                   getActualStatus() === 'afk' ? 'Away' :
                   getActualStatus()}
                </span>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-sm text-foreground leading-relaxed mb-4 max-w-md">{profile.bio}</p>
            )}

            {/* Location and Join Date */}
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{formatRegion(profile.regionType)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Joined {new Date(profile.createdAt).toLocaleDateString(userLocale, { 
                  year: 'numeric', 
                  month: 'long' 
                })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Social Links and Actions */}
        <div className="flex flex-col items-end space-y-4">
          {/* Social Links */}
          <div className="flex items-center space-x-2">
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.platform];
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-200"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              );
            })}
          </div>

          {/* Action Buttons */}
          {!isOwnProfile && (
            <div className="flex items-center space-x-2">
              <Button 
                variant={isFollowing ? "outline" : "default"}
                onClick={onFollow}
                size="sm"
                className="flex items-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isFollowing ? 'Following' : 'Follow'}</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={onMessage}
                size="sm"
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 