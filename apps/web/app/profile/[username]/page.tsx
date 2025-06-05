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
  Photo,
  GamerExperience,
  ConnectedPlatform,
  FavoriteGame,
  PCHardware,
  GameReview,
  Badge,
  Quest
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

// Gaming-related mock data
const mockGamerExperiences: GamerExperience[] = [
  {
    id: '1',
    game: 'Valorant',
    platform: 'PC',
    rank: 'Immortal 2',
    experience: 'professional',
    startDate: '2022-01-01T00:00:00.000Z',
    achievements: ['Regional Champion 2023', 'Team Liquid Player', 'International Tournament Competitor'],
  },
  {
    id: '2',
    game: 'League of Legends',
    platform: 'PC',
    rank: 'Diamond 1',
    experience: 'advanced',
    startDate: '2021-06-01T00:00:00.000Z',
    achievements: ['Content Creator', 'Twitch Partner', 'Educational Streamer'],
  },
];

const mockConnectedPlatforms: ConnectedPlatform[] = [
  {
    id: '1',
    platform: 'steam',
    username: 'gamer123',
    profileUrl: 'https://steamcommunity.com/id/gamer123',
    verified: true,
  },
  {
    id: '2',
    platform: 'epic',
    username: 'gamer123',
    profileUrl: 'https://epic.com/gamer123',
    verified: false,
  },
];

const mockFavoriteGames: FavoriteGame[] = [
  {
    id: '1',
    name: 'Valorant',
    iconUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    platform: 'PC',
    stats: {
      winRate: 68,
      totalGames: 890,
      rank: 'Immortal 2',
      rating: 2750,
      hoursPlayed: 1250,
    },
  },
  {
    id: '2',
    name: 'League of Legends',
    iconUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
    platform: 'PC',
    stats: {
      winRate: 72,
      totalGames: 1200,
      rank: 'Diamond 1',
      rating: 2400,
      hoursPlayed: 2100,
    },
  },
];

const mockPCHardware: PCHardware[] = [
  {
    id: '1',
    component: 'cpu',
    brand: 'Intel',
    model: 'Core i9-13900K',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200',
  },
  {
    id: '2',
    component: 'gpu',
    brand: 'NVIDIA',
    model: 'RTX 4080',
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200',
  },
  {
    id: '3',
    component: 'ram',
    brand: 'Corsair',
    model: 'Vengeance DDR5 32GB',
    imageUrl: 'https://images.unsplash.com/photo-1541029071515-84cc69b5c9e9?w=200',
  },
];

const mockGameReviews: GameReview[] = [
  {
    id: '1',
    gameId: 'cyberpunk-2077',
    gameName: 'Cyberpunk 2077',
    gameImageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100',
    rating: 4,
    reviewText: 'Amazing graphics and story, but still has some bugs. Worth playing after the updates.',
    playedHours: 85,
    platform: 'PC',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 15,
    helpful: 23,
  },
  {
    id: '2',
    gameId: 'elden-ring',
    gameName: 'Elden Ring',
    gameImageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100',
    rating: 5,
    reviewText: 'Masterpiece! The open world design is incredible and the boss fights are challenging.',
    playedHours: 120,
    platform: 'PC',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 32,
    helpful: 45,
  },
];

const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Victory',
    description: 'Won your first match',
    iconUrl: null,
    rarity: 'common',
    unlockedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'Tournament Champion',
    description: 'Won a major tournament',
    iconUrl: null,
    rarity: 'legendary',
    unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const mockQuests: Quest[] = [
  {
    id: '1',
    title: 'Win 10 Matches',
    description: 'Win 10 ranked matches this week',
    progress: 7,
    maxProgress: 10,
    status: 'in_progress',
    reward: '500 Credits',
  },
  {
    id: '2',
    title: 'Stream for 5 Hours',
    description: 'Stream gameplay for 5 hours',
    progress: 5,
    maxProgress: 5,
    status: 'completed',
    reward: 'Streamer Badge',
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
            The user profile you&apos;re looking for doesn&apos;t exist or has been removed.
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
      gamerExperiences={mockGamerExperiences}
      connectedPlatforms={mockConnectedPlatforms}
      favoriteGames={mockFavoriteGames}
      pcHardware={mockPCHardware}
      gameReviews={mockGameReviews}
      badges={mockBadges}
      quests={mockQuests}
      credits={1250}
      isOwnProfile={isOwnProfile}
      isFollowing={isFollowing}
      onFollow={handleFollow}
      onMessage={handleMessage}
    />
  );
}