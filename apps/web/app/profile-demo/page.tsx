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
  Photo,
  GamerExperience,
  ConnectedPlatform,
  FavoriteGame,
  PCHardware,
  GameReview
} from '@/types/user-profile';

// Demo data - Gaming focused profile
const demoProfile: UserProfile = {
  id: '1',
  userKeycloakId: 'demo-user-123',
  createdAt: '2020-06-15T10:30:00.000Z',
  updatedAt: '2024-06-15T10:30:00.000Z',
  deletedAt: null,
  birthDate: new Date(1995, 5, 15).toISOString(),
  userName: 'Shielda',
  firstName: 'Sahan',
  lastName: 'Jazzar',
  profileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
  bannerImageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200',
  bio: 'MMORPG LF Streamer passionate about competitive gaming. Currently competing with Beşiktaş E-Sports. Always looking for new challenges and teammates! 🎮⚡',
  website: 'https://www.shielda.com',
  gender: 'male',
  regionType: 'europe',
  lastOnline: '2024-06-15T22:00:00.000Z',
  rowVersion: '1',
  // Gaming specific fields
  nickname: 'Shielda',
  club: 'Beşiktaş E-Sports',
  tagline: 'MMORPG LF Streamer',
  currentStatus: 'in-game',
  gamerType: 'Professional Competitive',
  professionalBackground: 'Professional gamer with 5+ years of experience in competitive MMORPG tournaments. Started gaming career in 2019 and quickly rose through ranks. Currently representing Beşiktaş E-Sports team in national and international tournaments.',
};

const demoStats: ProfileStats = {
  posts: 247,
  followers: 3420,
  following: 892,
};

const demoSocialLinks: SocialLink[] = [
  { platform: 'twitter', url: 'https://twitter.com/shielda' },
  { platform: 'discord', url: 'https://discord.gg/shielda' },
  { platform: 'twitch', url: 'https://twitch.tv/shielda' },
  { platform: 'youtube', url: 'https://youtube.com/@shielda' },
  { platform: 'instagram', url: 'https://instagram.com/shielda' },
];

const demoGamerExperiences: GamerExperience[] = [
  {
    id: '1',
    game: 'Valorant',
    platform: 'PC',
    rank: 'Immortal 3',
    experience: 'professional',
    startDate: '2020-06-15T00:00:00.000Z',
    achievements: ['Regional Champion 2023', 'Top 500 Player', 'MVP Tournament Winner'],
  },
  {
    id: '2',
    game: 'League of Legends',
    platform: 'PC',
    rank: 'Grandmaster',
    experience: 'professional',
    startDate: '2019-01-15T00:00:00.000Z',
    achievements: ['Challenger Season 11', 'National Team Member', 'LCS Substitute'],
  },
  {
    id: '3',
    game: 'Counter-Strike 2',
    platform: 'PC',
    rank: 'Global Elite',
    experience: 'advanced',
    startDate: '2021-03-01T00:00:00.000Z',
    achievements: ['FACEIT Level 10', 'ESL Tournament Winner'],
  },
];

const demoConnectedPlatforms: ConnectedPlatform[] = [
  {
    id: '1',
    platform: 'steam',
    username: 'Shielda_Pro',
    profileUrl: 'https://steamcommunity.com/id/shielda_pro',
    verified: true,
  },
  {
    id: '2',
    platform: 'battlenet',
    username: 'Shielda#1337',
    profileUrl: 'https://battle.net/shielda',
    verified: true,
  },
  {
    id: '3',
    platform: 'epic',
    username: 'ShieldaGaming',
    profileUrl: 'https://epic.com/shielda',
    verified: false,
  },
];

const demoFavoriteGames: FavoriteGame[] = [
  {
    id: '1',
    name: 'Valorant',
    iconUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100',
    platform: 'PC',
    stats: {
      winRate: 73,
      totalGames: 1340,
      rank: 'Immortal 3',
      rating: 2847,
      hoursPlayed: 2450,
    },
  },
  {
    id: '2',
    name: 'League of Legends',
    iconUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100',
    platform: 'PC',
    stats: {
      winRate: 68,
      totalGames: 890,
      rank: 'Grandmaster',
      rating: 3200,
      hoursPlayed: 1850,
    },
  },
  {
    id: '3',
    name: 'Counter-Strike 2',
    iconUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=100',
    platform: 'PC',
    stats: {
      winRate: 65,
      totalGames: 567,
      rank: 'Global Elite',
      rating: 2950,
      hoursPlayed: 890,
    },
  },
];

const demoPCHardware: PCHardware[] = [
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
    model: 'RTX 4080 Super',
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200',
  },
  {
    id: '3',
    component: 'ram',
    brand: 'Corsair',
    model: 'Vengeance RGB Pro 32GB DDR5',
    imageUrl: 'https://images.unsplash.com/photo-1541029071515-84cc69b5c9e9?w=200',
  },
  {
    id: '4',
    component: 'keyboard',
    brand: 'Logitech',
    model: 'G Pro X Mechanical',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200',
  },
  {
    id: '5',
    component: 'mouse',
    brand: 'Logitech',
    model: 'G Pro X Superlight',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200',
  },
  {
    id: '6',
    component: 'headset',
    brand: 'SteelSeries',
    model: 'Arctis Pro Wireless',
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200',
  },
];

const demoGameReviews: GameReview[] = [
  {
    id: '1',
    gameId: 'valorant',
    gameName: 'Valorant',
    gameImageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100',
    rating: 5,
    reviewText: 'Absolutely incredible tactical shooter! The gameplay is perfectly balanced and the competitive scene is amazing. Been playing for 4 years and still discovering new strategies. Perfect for team play and individual skill development.',
    playedHours: 2450,
    platform: 'PC',
    createdAt: '2024-05-15T10:00:00.000Z',
    likes: 89,
    helpful: 156,
  },
  {
    id: '2',
    gameId: 'lol',
    gameName: 'League of Legends',
    gameImageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100',
    rating: 4,
    reviewText: 'Great MOBA with deep strategic gameplay. The learning curve is steep but rewarding. Amazing esports scene and constant updates keep the game fresh. Some toxicity in community but overall fantastic game.',
    playedHours: 1850,
    platform: 'PC',
    createdAt: '2024-04-20T15:30:00.000Z',
    likes: 67,
    helpful: 134,
  },
  {
    id: '3',
    gameId: 'cs2',
    gameName: 'Counter-Strike 2',
    gameImageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=100',
    rating: 4,
    reviewText: 'Classic tactical FPS with improved graphics and mechanics. The Source 2 engine brings new life to the game. Competitive matches are intense and rewarding. Some network issues but overall great evolution.',
    playedHours: 890,
    platform: 'PC',
    createdAt: '2024-03-10T12:00:00.000Z',
    likes: 45,
    helpful: 89,
  },
];

// Keeping some existing demo data
const demoPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Shielda',
    userProfileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    content: 'Just hit Immortal 3 in Valorant! 💎 The grind with @BeşiktaşEsports team was intense but totally worth it. Next goal: Radiant rank! Who wants to duo queue? 🎯 #Valorant #Esports',
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600',
    ],
    createdAt: '2024-06-15T20:00:00.000Z',
    likes: 256,
    comments: 43,
    shares: 18,
    gameTag: 'Valorant',
    postType: 'achievement',
  },
  {
    id: '2',
    userId: '1',
    userName: 'Shielda',
    userProfileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    content: 'New gaming setup is finally complete! 🔥 RTX 4080 Super + i9-13900K = Pure performance. Stream quality is going to be insane! Setup tour coming tonight on stream 📺',
    images: [
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600',
    ],
    createdAt: '2024-06-14T22:00:00.000Z',
    likes: 189,
    comments: 67,
    shares: 25,
    gameTag: null,
    postType: 'general',
  },
];

const demoFriends: Friend[] = [
  {
    id: '1',
    userName: 'ProGamer_TR',
    profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    isOnline: true,
    currentGame: 'Valorant',
    status: 'in-game',
  },
  {
    id: '2',
    userName: 'EsportsKing',
    profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    isOnline: true,
    currentGame: null,
    status: 'online',
  },
  {
    id: '3',
    userName: 'StreamQueen',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    isOnline: false,
    currentGame: null,
    status: 'offline',
  },
];

const demoGroups: Group[] = [
  {
    id: '1',
    name: 'Beşiktaş Esports',
    iconUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100',
    memberCount: 245,
    category: 'esports',
    isOfficial: true,
  },
  {
    id: '2',
    name: 'Valorant Turkey',
    iconUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100',
    memberCount: 25420,
    category: 'gaming',
    isOfficial: false,
  },
];

const demoPhotos: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    caption: 'Tournament setup 🏆',
    createdAt: '2024-06-08T12:00:00.000Z',
    category: 'achievement',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
    caption: 'Team victory celebration! 🎉',
    createdAt: '2024-06-01T12:00:00.000Z',
    category: 'team',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400',
    caption: 'New gaming setup complete',
    createdAt: '2024-05-25T12:00:00.000Z',
    category: 'setup',
  },
];

export default function ProfileDemoPage() {
  const handleFollow = () => {
    console.log('Follow user');
  };

  const handleMessage = () => {
    console.log('Message user');
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
      gamerExperiences={demoGamerExperiences}
      connectedPlatforms={demoConnectedPlatforms}
      favoriteGames={demoFavoriteGames}
      pcHardware={demoPCHardware}
      gameReviews={demoGameReviews}
      isOwnProfile={false}
      isFollowing={false}
      onFollow={handleFollow}
      onMessage={handleMessage}
    />
  );
} 