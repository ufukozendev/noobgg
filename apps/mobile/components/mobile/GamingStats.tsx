import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const stats = [
  {
    id: 'active-players',
    value: '2,247',
    label: 'Active Players',
    icon: '👥',
    color: '#9b87f5',
    gradient: ['#6f52f4', '#9b87f5'],
  },
  {
    id: 'daily-matches',
    value: '1,834',
    label: 'Daily Matches',
    icon: '🎮',
    color: '#22c55e',
    gradient: ['#16a34a', '#22c55e'],
  },
  {
    id: 'tournaments',
    value: '47',
    label: 'Live Tournaments',
    icon: '🏆',
    color: '#f59e0b',
    gradient: ['#d97706', '#f59e0b'],
  },
  {
    id: 'communities',
    value: '156',
    label: 'Gaming Communities',
    icon: '🌍',
    color: '#ef4444',
    gradient: ['#dc2626', '#ef4444'],
  },
];

export function GamingStats() {
  return (
    <View className="px-4 mt-8">
      <Animated.View entering={FadeInUp.delay(800).duration(800)}>
        <Text className="text-2xl font-bold text-center text-foreground mb-2">
          <Text className="text-purple-400">Global Gaming</Text> Community
        </Text>
        <Text className="text-muted-foreground text-center text-base mb-6">
          Real-time statistics from around the world
        </Text>
      </Animated.View>
      
      <View className="flex-row flex-wrap justify-between">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.id}
            stat={stat}
            index={index}
          />
        ))}
      </View>
    </View>
  );
}

function StatCard({ 
  stat, 
  index 
}: {
  stat: typeof stats[0];
  index: number;
}) {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    // Staggered animation
    const delay = index * 150;
    
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      })
    );
    
    scale.value = withDelay(
      delay,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.2)),
      })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePress = () => {
    scale.value = withTiming(0.95, {
      duration: 100,
      easing: Easing.out(Easing.ease),
    });
    
    setTimeout(() => {
      scale.value = withTiming(1, {
        duration: 100,
        easing: Easing.out(Easing.ease),
      });
    }, 100);
  };

  return (
    <Animated.View 
      style={[animatedStyle]}
      className="w-[48%] mb-4"
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={1}
        className="h-24"
      >
        <LinearGradient
          colors={[...stat.gradient, 'rgba(0,0,0,0.1)']}
          className="flex-1 rounded-xl p-4 justify-center border border-white/10"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white text-2xl font-bold mb-1">
                {stat.value}
              </Text>
              <Text className="text-white/80 text-xs font-medium">
                {stat.label}
              </Text>
            </View>
            <View className="w-8 h-8 bg-white/20 rounded-lg items-center justify-center">
              <Text className="text-lg">{stat.icon}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}
