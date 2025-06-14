import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

const quickActions = [
  {
    id: 'create-lobby',
    title: 'Create Lobby',
    subtitle: 'Start your own game',
    icon: '🎮',
    colors: ['#6f52f4', '#9b87f5'],
  },
  {
    id: 'find-team',
    title: 'Find Team',
    subtitle: 'Join existing lobbies',
    icon: '👥',
    colors: ['#22c55e', '#4ade80'],
  },
  {
    id: 'tournaments',
    title: 'Tournaments',
    subtitle: 'Compete & win prizes',
    icon: '🏆',
    colors: ['#f59e0b', '#fbbf24'],
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard',
    subtitle: 'Check your ranking',
    icon: '📊',
    colors: ['#ef4444', '#f87171'],
  },
];

export function QuickActions() {
  return (
    <View className="px-4 mt-8">
      <Animated.View entering={FadeInUp.delay(400).duration(800)}>
        <Text className="text-xl font-bold text-foreground mb-4">
          Quick Actions
        </Text>
      </Animated.View>
      
      <View className="flex-row flex-wrap justify-between">
        {quickActions.map((action, index) => (
          <Animated.View
            key={action.id}
            entering={FadeInUp.delay(600 + index * 100).duration(800)}
            className="w-[48%] mb-4"
          >
            <TouchableOpacity
              activeOpacity={0.8}
              className="h-24"
            >
              <LinearGradient
                colors={action.colors}
                className="flex-1 rounded-xl p-4 justify-center"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-3">{action.icon}</Text>
                  <View className="flex-1">
                    <Text className="text-white font-semibold text-sm">
                      {action.title}
                    </Text>
                    <Text className="text-white/80 text-xs">
                      {action.subtitle}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}
