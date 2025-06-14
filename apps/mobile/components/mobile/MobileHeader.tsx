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
          onPress={() => {
            // TODO: Navigate to notifications
            console.log('Notifications pressed');
          }}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Text className="text-foreground text-lg">🔔</Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          className="w-11 h-11 rounded-full overflow-hidden border-2 border-purple-400/60"
          style={{
            shadowColor: '#9b87f5',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
          activeOpacity={0.8}
          onPress={() => {
            // TODO: Navigate to profile
            console.log('Profile pressed');
          }}
          accessibilityRole="button"
          accessibilityLabel="Profile"
        >
          <Image
            source={require('../../assets/lobby/gamer-avatar-4.png')}
            className="w-full h-full"
            style={{ resizeMode: 'cover' }}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
