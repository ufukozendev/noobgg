import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

// Game data from web version
const games = [
  {
    id: "valorant",
    name: "Valorant",
    logo: "/logos/valorant-logo.svg", // Will need to be converted to require() for mobile
    description: "Tactical 5v5 shooter that demands precise aim and strategic thinking.",
    playerCount: "1,247",
    status: "Very Active",
    color: "#ff4655",
  },
  {
    id: "lol",
    name: "League of Legends",
    logo: "/logos/league-of-legends-logo.svg",
    description: "The world's most popular MOBA with endless strategic depth.",
    playerCount: "892",
    status: "Active",
    color: "#c89b3c",
  },
  {
    id: "fortnite",
    name: "Fortnite",
    logo: "/logos/fortnite-logo.svg",
    description: "Battle royale with building mechanics and constant updates.",
    playerCount: "634",
    status: "Active",
    color: "#00d4ff",
  },
  {
    id: "pubg",
    name: "PUBG",
    logo: "/logos/pubg-logo.webp",
    description: "The original battle royale experience with realistic combat.",
    playerCount: "423",
    status: "Moderate",
    color: "#f99e1a",
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    logo: "/logos/counter-strike-2.svg",
    description: "The legendary tactical shooter, now with Source 2 engine.",
    playerCount: "756",
    status: "Very Active",
    color: "#f0b90b",
  },
];

export function PopularGames() {
  const [selectedGame, setSelectedGame] = useState(0);
  const cardWidth = screenWidth * 0.8;

  return (
    <View className="mt-12">
      {/* Enhanced Section Header */}
      <Animated.View
        entering={FadeInRight.delay(200).duration(800)}
        className="px-4 mb-8"
      >
        <Text className="text-3xl font-bold text-center text-foreground mb-3">
          <Text className="text-purple-400">Pick Your Game.</Text> Find Your People.
        </Text>
        <Text className="text-muted-foreground text-center text-base leading-relaxed px-4">
          Join active gaming communities worldwide and dominate together
        </Text>

        {/* Live indicator */}
        <View className="flex-row items-center justify-center mt-4">
          <View className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
          <Text className="text-green-400 text-sm font-medium">
            Live communities active now
          </Text>
        </View>
      </Animated.View>

      {/* Games Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        className="mb-4"
      >
        {games.map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            isSelected={selectedGame === index}
            onPress={() => setSelectedGame(index)}
            width={cardWidth}
            isLast={index === games.length - 1}
          />
        ))}
      </ScrollView>

      {/* Enhanced Selected Game Details */}
      <Animated.View
        key={selectedGame}
        entering={FadeInRight.duration(500)}
        className="px-4 mt-6"
      >
        <View className="bg-card/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-lg">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl items-center justify-center mr-3">
                <Text className="text-white text-lg font-bold">
                  {games[selectedGame].name.charAt(0)}
                </Text>
              </View>
              <View>
                <Text className="text-xl font-bold text-foreground">
                  {games[selectedGame].name}
                </Text>
                <View className="flex-row items-center mt-1">
                  <View className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                  <Text className="text-green-400 text-sm font-medium">
                    {games[selectedGame].status}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Text className="text-muted-foreground text-sm mb-6 leading-relaxed">
            {games[selectedGame].description}
          </Text>

          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row space-x-6">
              <View className="items-center">
                <Text className="text-2xl font-bold text-purple-400">
                  {games[selectedGame].playerCount}
                </Text>
                <Text className="text-muted-foreground text-xs">
                  Active Players
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-green-400">
                  {Math.floor(Math.random() * 50) + 10}
                </Text>
                <Text className="text-muted-foreground text-xs">
                  Live Lobbies
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row space-x-3">
            <TouchableOpacity
              className="flex-1"
              activeOpacity={0.8}
            >
              <View className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl py-3 px-4">
                <Text className="text-white font-semibold text-center">
                  🎮 Join Lobby
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1"
              activeOpacity={0.7}
            >
              <View className="border border-purple-400/40 rounded-xl py-3 px-4 bg-purple-500/10">
                <Text className="text-purple-400 font-medium text-center">
                  📊 View Stats
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

function GameCard({ 
  game, 
  isSelected, 
  onPress, 
  width, 
  isLast 
}: {
  game: typeof games[0];
  isSelected: boolean;
  onPress: () => void;
  width: number;
  isLast: boolean;
}) {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, {
      duration: 150,
      easing: Easing.out(Easing.ease),
    });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.out(Easing.ease),
    });
  };

  return (
    <Animated.View style={[animatedStyle, { width }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        className={`mr-4 ${isLast ? 'mr-0' : ''}`}
      >
        <LinearGradient
          colors={
            isSelected 
              ? ['rgba(107, 82, 244, 0.3)', 'rgba(155, 135, 245, 0.1)']
              : ['rgba(32, 32, 32, 0.8)', 'rgba(16, 16, 16, 0.9)']
          }
          className={`rounded-xl p-4 border ${
            isSelected 
              ? 'border-purple-400/50' 
              : 'border-border'
          }`}
        >
          <View className="items-center">
            {/* Game Logo Placeholder */}
            <View className="w-16 h-16 bg-muted rounded-lg mb-3 items-center justify-center">
              <Text className="text-2xl">{game.name.charAt(0)}</Text>
            </View>
            
            <Text className="text-foreground font-semibold text-center mb-1">
              {game.name}
            </Text>
            
            <Text className="text-muted-foreground text-xs text-center">
              {game.playerCount} players
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}
