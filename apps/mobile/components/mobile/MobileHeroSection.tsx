import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, {
  FadeInUp,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

export function MobileHeroSection() {
  // Multiple animation values for enhanced effects
  const glowOpacity = useSharedValue(0.3);
  const pulseScale = useSharedValue(1);
  const floatY = useSharedValue(0);

  React.useEffect(() => {
    // Glow animation
    glowOpacity.value = withRepeat(
      withTiming(0.8, {
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    // Pulse animation for CTA button
    pulseScale.value = withRepeat(
      withTiming(1.05, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    // Floating animation for badge
    floatY.value = withRepeat(
      withTiming(-5, {
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  return (
    <View className="relative px-4 pt-4 pb-12">
      {/* Enhanced Background with multiple gradients */}
      <LinearGradient
        colors={[
          'rgba(107, 82, 244, 0.15)',
          'rgba(155, 135, 245, 0.08)',
          'rgba(34, 197, 94, 0.05)',
          'transparent'
        ]}
        className="absolute inset-0 rounded-3xl"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Multiple Animated Glow Effects */}
      <Animated.View
        style={[glowStyle]}
        className="absolute top-0 left-1/2 w-80 h-80 -translate-x-40 -translate-y-20"
      >
        <LinearGradient
          colors={['rgba(155, 135, 245, 0.4)', 'rgba(155, 135, 245, 0.1)', 'transparent']}
          className="w-full h-full rounded-full"
        />
      </Animated.View>

      <Animated.View
        style={[glowStyle, { opacity: glowOpacity.value * 0.6 }]}
        className="absolute bottom-0 right-0 w-60 h-60 translate-x-20 translate-y-20"
      >
        <LinearGradient
          colors={['rgba(34, 197, 94, 0.3)', 'rgba(34, 197, 94, 0.1)', 'transparent']}
          className="w-full h-full rounded-full"
        />
      </Animated.View>

      <View className="relative z-10">
        {/* Floating Badge */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(800)}
          style={floatStyle}
          className="self-center mb-8"
        >
          <BlurView intensity={20} className="rounded-full overflow-hidden">
            <View className="bg-purple-500/30 border border-purple-400/50 rounded-full px-5 py-3">
              <Text className="text-purple-300 text-sm font-semibold text-center">
                ✨ Join 2,000+ gamers who found their squad in under 5 minutes
              </Text>
            </View>
          </BlurView>
        </Animated.View>

        {/* Enhanced Main Title */}
        <Animated.View entering={FadeInUp.delay(400).duration(800)}>
          <Text className="text-3xl font-bold text-center text-foreground mb-3 leading-tight px-2">
            Still Getting Matched With{' '}
            <Text className="text-purple-400">Randoms</Text>{' '}
            Who Rage Quit?
          </Text>
        </Animated.View>

        {/* Enhanced Subtitle */}
        <Animated.View entering={FadeInUp.delay(600).duration(800)}>
          <Text className="text-muted-foreground text-center text-base mb-10 px-6 leading-relaxed">
            Find your perfect gaming squad instantly. No more toxic teammates, no more rage quits.
            <Text className="text-green-400 font-medium"> Join the revolution.</Text>
          </Text>
        </Animated.View>

        {/* Enhanced Primary CTA with Pulse Animation */}
        <Animated.View
          entering={FadeInDown.delay(800).duration(800)}
          style={pulseStyle}
        >
          <TouchableOpacity
            className="mx-6 mb-4"
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#6f52f4', '#9b87f5', '#a78bfa']}
              className="rounded-2xl py-4 px-8 shadow-lg"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View className="flex-row items-center justify-center">
                <Text className="text-white text-center text-lg font-bold mr-2">
                  Find Your Squad Now
                </Text>
                <Text className="text-white text-xl">🚀</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Enhanced Secondary CTA */}
        <Animated.View entering={FadeInDown.delay(1000).duration(800)}>
          <TouchableOpacity
            className="mx-6 mb-4"
            activeOpacity={0.8}
          >
            <BlurView intensity={15} className="rounded-2xl overflow-hidden">
              <View className="border border-purple-400/40 rounded-2xl py-3 px-8 bg-purple-500/10">
                <View className="flex-row items-center justify-center">
                  <Text className="text-purple-300 text-center text-base font-semibold mr-2">
                    Browse Active Lobbies
                  </Text>
                  <Text className="text-purple-400">👥</Text>
                </View>
              </View>
            </BlurView>
          </TouchableOpacity>
        </Animated.View>

        {/* Quick Stats Preview */}
        <Animated.View entering={FadeInUp.delay(1200).duration(800)}>
          <View className="flex-row justify-center items-center mt-6 space-x-6">
            <View className="items-center">
              <Text className="text-green-400 text-lg font-bold">2,247</Text>
              <Text className="text-muted-foreground text-xs">Online Now</Text>
            </View>
            <View className="w-px h-8 bg-border" />
            <View className="items-center">
              <Text className="text-purple-400 text-lg font-bold">47</Text>
              <Text className="text-muted-foreground text-xs">Live Matches</Text>
            </View>
            <View className="w-px h-8 bg-border" />
            <View className="items-center">
              <Text className="text-yellow-400 text-lg font-bold">156</Text>
              <Text className="text-muted-foreground text-xs">Communities</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
