"use client";

import React from 'react';
import { UserProfilePage } from '@/components/user-profile/user-profile-page';
import type { 
  UserProfile,
  ProfileStats, 
  SocialLink, 
  Post, 
  Friend, 
  Group, 
  Photo 
} from '@/types/user-profile';

// Demo data - Static dates to prevent hydration mismatch
const demoProfile: UserProfile = {
  id: BigInt(1),
  userKeycloakId: 'demo-user-123',
  createdAt: '2023-06-15T10:30:00.000Z', // Static date - joined 1 year ago
  updatedAt: '2024-06-15T10:30:00.000Z', // Static date
  deletedAt: null,
  birthDate: new Date(1995, 5, 15).toISOString(),
  userName: 'iShielda',
  firstName: 'Ahmet',
  lastName: 'Yılmaz',
  profileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
  bannerImageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200',
  bio: 'Passionate gamer and content creator. Love playing competitive games and streaming. Always looking for new challenges and teammates to play with! 🎮✨',
  website: 'https://www.ishielda.com',
  gender: 'male',
  regionType: 'europe',
  lastOnline: '2024-06-15T22:00:00.000Z', // Static date - 30 minutes ago
  rowVersion: '1',
};

const demoStats: ProfileStats = {
  posts: 247,
  followers: 3420,
  following: 892,
};

const demoSocialLinks: SocialLink[] = [
  { platform: 'twitter', url: 'https://twitter.com/ishielda' },
  { platform: 'discord', url: 'https://discord.gg/ishielda' },
  { platform: 'twitch', url: 'https://twitch.tv/ishielda' },
  { platform: 'youtube', url: 'https://youtube.com/@ishielda' },
  { platform: 'instagram', url: 'https://instagram.com/ishielda' },
];

const demoPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    userName: 'iShielda',
    userProfileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    content: 'Just hit Diamond III in Valorant! 💎 The grind was real but totally worth it. Thanks to everyone who supported me during the streams! 🙏\n\nNext goal: Immortal rank! Who wants to duo queue? 🎯',
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600',
    ],
    createdAt: '2024-06-15T20:00:00.000Z', // Static date - 2 hours ago
    likes: 156,
    comments: 23,
    shares: 8,
  },
  {
    id: '2',
    userId: '1',
    userName: 'iShielda',
    userProfileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    content: 'New gaming setup is finally complete! 🔥 Spent weeks researching and building this beast. The RGB lighting is just *chef\'s kiss* 💋\n\nSpecs in the comments below! What do you think?',
    images: [
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600',
    ],
    createdAt: '2024-06-14T22:00:00.000Z', // Static date - 1 day ago
    likes: 89,
    comments: 34,
    shares: 12,
  },
  {
    id: '3',
    userId: '1',
    userName: 'iShielda',
    userProfileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    content: 'Looking for teammates for the upcoming tournament! 🏆 We need 2 more players for our team. Requirements:\n\n• Rank: Plat+ \n• Good communication\n• Available for practice 3x/week\n• Positive attitude\n\nDM me if interested! 📩',
    images: [],
    createdAt: '2024-06-12T22:00:00.000Z', // Static date - 3 days ago
    likes: 67,
    comments: 45,
    shares: 15,
  },
];

const demoFriends: Friend[] = [
  {
    id: '1',
    userName: 'Xoien',
    profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    isOnline: true,
  },
  {
    id: '2',
    userName: 'ProGamer2023',
    profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    isOnline: true,
  },
  {
    id: '3',
    userName: 'StreamQueen',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    isOnline: false,
  },
  {
    id: '4',
    userName: 'NoobMaster69',
    profileImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    isOnline: true,
  },
  {
    id: '5',
    userName: 'EsportsKing',
    profileImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    isOnline: false,
  },
  {
    id: '6',
    userName: 'GamerGirl2024',
    profileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    isOnline: true,
  },
];

const demoGroups: Group[] = [
  {
    id: '1',
    name: 'Valorant Turkey',
    iconUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100',
    memberCount: 25420,
  },
  {
    id: '2',
    name: 'Gaming Community TR',
    iconUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100',
    memberCount: 18750,
  },
  {
    id: '3',
    name: 'Esports Enthusiasts',
    iconUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=100',
    memberCount: 12300,
  },
  {
    id: '4',
    name: 'Competitive Gaming',
    iconUrl: null,
    memberCount: 8900,
  },
  {
    id: '5',
    name: 'Streamers United',
    iconUrl: null,
    memberCount: 5600,
  },
];

const demoPhotos: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    caption: 'My ultimate gaming setup 🔥',
    createdAt: '2024-06-08T12:00:00.000Z', // Static date - 1 week ago
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
    caption: 'Tournament victory! 🏆',
    createdAt: '2024-06-01T12:00:00.000Z', // Static date - 2 weeks ago
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400',
    caption: 'New mechanical keyboard arrived',
    createdAt: '2024-05-25T12:00:00.000Z', // Static date - 3 weeks ago
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
    caption: 'Gaming with the squad',
    createdAt: '2024-05-18T12:00:00.000Z', // Static date - 4 weeks ago
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400',
    caption: 'Late night gaming session',
    createdAt: '2024-05-11T12:00:00.000Z', // Static date - 5 weeks ago
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
    caption: 'New headset test',
    createdAt: '2024-05-04T12:00:00.000Z', // Static date - 6 weeks ago
  },
];

export default function ProfileDemoPage() {
  const handleFollow = () => {
    alert('Follow functionality would be implemented here!');
  };

  const handleMessage = () => {
    alert('Message functionality would be implemented here!');
  };

  return (
    <UserProfilePage
      profile={demoProfile}
      stats={demoStats}
      socialLinks={demoSocialLinks}
      posts={demoPosts}
      friends={demoFriends}
      groups={demoGroups}
      photos={demoPhotos}
      isOwnProfile={false}
      isFollowing={false}
      onFollow={handleFollow}
      onMessage={handleMessage}
    />
  );
} 