import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

export function MobileHeader() {
  return (
    <Animated.View 
      entering={FadeInDown.duration(800)}
      className="px-4 py-3 flex-row items-center justify-between"
    >
      {/* Logo and Brand */}
      <View className="flex-row items-center">
        <View className="w-10 h-10 bg-purple-500/20 rounded-lg items-center justify-center mr-3">
          <Text className="text-purple-400 text-lg font-bold">N</Text>
        </View>
        <Text className="text-2xl font-bold">
          <Text className="text-purple-400">noob</Text>
          <Text className="text-foreground">.gg</Text>
        </Text>
      </View>

      {/* Right Side Actions */}
      <View className="flex-row items-center space-x-3">
        {/* Notifications */}
        <TouchableOpacity
          className="w-10 h-10 bg-card/50 rounded-lg items-center justify-center"
          activeOpacity={0.7}
        >
          <Text className="text-foreground text-lg">🔔</Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg items-center justify-center"
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg">👤</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
