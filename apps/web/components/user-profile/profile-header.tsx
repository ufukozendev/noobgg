"use client";

import React from 'react';
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

interface ProfileHeaderProps {
  profile: UserProfile;
  stats: ProfileStats;
  socialLinks: SocialLink[];
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
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
}: ProfileHeaderProps) {
  const getInitials = (firstName: string | null, lastName: string | null, userName: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return userName[0]?.toUpperCase() || 'U';
  };

  const formatRegion = (region: string) => {
    return region.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="relative">
      {/* Banner */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
        {profile.bannerImageUrl ? (
          <img
            src={profile.bannerImageUrl}
            alt="Profile banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600" />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 relative z-10">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage 
                  src={profile.profileImageUrl || undefined} 
                  alt={profile.userName}
                />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  {getInitials(profile.firstName, profile.lastName, profile.userName)}
                </AvatarFallback>
              </Avatar>
              {/* Online Status */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full" />
            </div>

            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white md:text-foreground">
                  {profile.firstName && profile.lastName 
                    ? `${profile.firstName} ${profile.lastName}` 
                    : profile.userName}
                </h1>
                {/* Verified Badge */}
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-200 md:text-muted-foreground">@{profile.userName}</p>
              
              {/* Location and Join Date */}
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-200 md:text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{formatRegion(profile.regionType)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(profile.createdAt).toLocaleDateString('tr-TR', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.platform];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                );
              })}
            </div>
            
            {!isOwnProfile && (
              <>
                <Button 
                  variant={isFollowing ? "outline" : "default"}
                  onClick={onFollow}
                  className="flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isFollowing ? 'Following' : 'Follow'}</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onMessage}
                  className="flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="mt-6">
            <p className="text-foreground leading-relaxed">{profile.bio}</p>
          </div>
        )}

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.posts.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.followers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.following.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Following</div>
          </div>
        </div>
      </div>
    </div>
  );
} 