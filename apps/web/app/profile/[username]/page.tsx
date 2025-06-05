"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { UserProfilePage } from '@/components/user-profile/user-profile-page';
import { useUserProfileByUsername } from '@/features/user-profiles/api/use-user-profiles';
import type { 
  ProfileStats, 
  SocialLink, 
  Post, 
  Friend, 
  Group, 
  Photo 
} from '@/types/user-profile';

// Mock data - Bu veriler gerçek API'den gelecek
const mockStats: ProfileStats = {
  posts: 142,
  followers: 1250,
  following: 389,
};

const mockSocialLinks: SocialLink[] = [
  { platform: 'twitter', url: 'https://twitter.com/username' },
  { platform: 'discord', url: 'https://discord.gg/username' },
  { platform: 'twitch', url: 'https://twitch.tv/username' },
];

const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    userName: 'testuser',
    userProfileImageUrl: null,
    content: 'Just finished an amazing gaming session! 🎮 The new update is incredible.',
    images: [],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    likes: 24,
    comments: 8,
    shares: 3,
  },
  {
    id: '2',
    userId: '1',
    userName: 'testuser',
    userProfileImageUrl: null,
    content: 'Looking for teammates for ranked matches. Anyone interested? Drop a comment below! 💪',
    images: [],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    likes: 15,
    comments: 12,
    shares: 2,
  },
];

const mockFriends: Friend[] = [
  {
    id: '1',
    userName: 'gamer123',
    profileImageUrl: null,
    isOnline: true,
  },
  {
    id: '2',
    userName: 'proPlayer',
    profileImageUrl: null,
    isOnline: false,
  },
  {
    id: '3',
    userName: 'streamQueen',
    profileImageUrl: null,
    isOnline: true,
  },
  {
    id: '4',
    userName: 'noobMaster',
    profileImageUrl: null,
    isOnline: false,
  },
];

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Valorant Turkey',
    iconUrl: null,
    memberCount: 15420,
  },
  {
    id: '2',
    name: 'Gaming Community',
    iconUrl: null,
    memberCount: 8750,
  },
  {
    id: '3',
    name: 'Esports Enthusiasts',
    iconUrl: null,
    memberCount: 3200,
  },
];

const mockPhotos: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    caption: 'My gaming setup',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
    caption: 'Tournament victory!',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400',
    caption: 'New keyboard arrived',
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
  },
];

export default function ProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  
  const { data: profile, isLoading, error } = useUserProfileByUsername(username);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground">
            The user profile you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // TODO: Determine if this is the current user's own profile
  const isOwnProfile = false;
  const isFollowing = false;

  const handleFollow = () => {
    // TODO: Implement follow functionality
    console.log('Follow user:', profile.userName);
  };

  const handleMessage = () => {
    // TODO: Implement message functionality
    console.log('Message user:', profile.userName);
  };

  return (
    <UserProfilePage
      profile={profile}
      stats={mockStats}
      socialLinks={mockSocialLinks}
      posts={mockPosts}
      friends={mockFriends}
      groups={mockGroups}
      photos={mockPhotos}
      isOwnProfile={isOwnProfile}
      isFollowing={isFollowing}
      onFollow={handleFollow}
      onMessage={handleMessage}
    />
  );
} 