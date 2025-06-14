import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Basit test için inline styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0613',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoAccent: {
    color: '#9b87f5',
  },
  heroSection: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(155, 135, 245, 0.2)',
    borderColor: 'rgba(155, 135, 245, 0.5)',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
  },
  badgeText: {
    color: '#9b87f5',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  titleAccent: {
    color: '#9b87f5',
  },
  subtitle: {
    fontSize: 16,
    color: '#a1a1aa',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  ctaButton: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    borderColor: 'rgba(155, 135, 245, 0.4)',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: 16,
    backgroundColor: 'rgba(155, 135, 245, 0.1)',
  },
  secondaryText: {
    color: '#9b87f5',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ade80',
  },
  statLabel: {
    fontSize: 12,
    color: '#a1a1aa',
    marginTop: 4,
  },
});

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0613" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#0a0613', '#150d27', '#1a1625']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            <Text style={styles.logoAccent}>noob</Text>.gg
          </Text>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'rgba(155, 135, 245, 0.2)',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 18 }}>👤</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            {/* Badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                ✨ Join 2,000+ gamers who found their squad in under 5 minutes
              </Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>
              Still Getting Matched With{' '}
              <Text style={styles.titleAccent}>Randoms</Text>{' '}
              Who Rage Quit?
            </Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
              Find your perfect gaming squad instantly. No more toxic teammates, no more rage quits.{' '}
              <Text style={{ color: '#4ade80', fontWeight: '600' }}>Join the revolution.</Text>
            </Text>

            {/* Primary CTA */}
            <TouchableOpacity activeOpacity={0.9}>
              <LinearGradient
                colors={['#6f52f4', '#9b87f5']}
                style={styles.ctaButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.ctaText}>
                  🚀 Find Your Squad Now
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Secondary CTA */}
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
              <Text style={styles.secondaryText}>
                👥 Browse Active Lobbies
              </Text>
            </TouchableOpacity>

            {/* Quick Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: '#4ade80' }]}>2,247</Text>
                <Text style={styles.statLabel}>Online Now</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: '#9b87f5' }]}>47</Text>
                <Text style={styles.statLabel}>Live Matches</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: '#facc15' }]}>156</Text>
                <Text style={styles.statLabel}>Communities</Text>
              </View>
            </View>
          </View>

          {/* Games Section - Poster Style */}
          <View style={{ paddingHorizontal: 16, marginTop: 40 }}>
            <Text style={[styles.title, { fontSize: 24, marginBottom: 8 }]}>
              <Text style={styles.titleAccent}>Pick Your Game.</Text> Find Your People.
            </Text>
            <Text style={[styles.subtitle, { marginBottom: 24, paddingHorizontal: 0 }]}>
              Join active gaming communities worldwide
            </Text>

            {/* Game Posters */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                {
                  name: 'Valorant',
                  color: '#ff4655',
                  gradient: ['#ff4655', '#ff6b7a'],
                  coins: '2,500',
                  lobbies: '23',
                  players: '1,247',
                  image: require('../assets/valorand-game-card.jpg')
                },
                {
                  name: 'League of Legends',
                  color: '#c89b3c',
                  gradient: ['#c89b3c', '#d4af37'],
                  coins: '1,850',
                  lobbies: '18',
                  players: '892',
                  image: require('../assets/league-legends-game-card.jpg')
                },
                {
                  name: 'Fortnite',
                  color: '#00d4ff',
                  gradient: ['#00d4ff', '#40e0d0'],
                  coins: '3,200',
                  lobbies: '15',
                  players: '634',
                  image: require('../assets/fornite-game-card.jpg')
                },
                {
                  name: 'CS2',
                  color: '#f0b90b',
                  gradient: ['#f0b90b', '#ffd700'],
                  coins: '2,100',
                  lobbies: '19',
                  players: '756',
                  image: require('../assets/cs2-game-card.jpg')
                }
              ].map((game, index) => (
                <TouchableOpacity
                  key={game.name}
                  style={{
                    width: screenWidth * 0.55,
                    height: screenWidth * 0.75, // Poster aspect ratio
                    marginRight: 16,
                    borderRadius: 16,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                  activeOpacity={0.9}
                >
                  {/* Background Image */}
                  <ImageBackground
                    source={game.image}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                    resizeMode="cover"
                  />

                  {/* Gradient Overlay for better text readability */}
                  <LinearGradient
                    colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  />

                  {/* Top Section - Game Icon */}
                  <View style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    right: 16,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <View style={{
                      width: 40,
                      height: 40,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
                        {game.name.charAt(0)}
                      </Text>
                    </View>
                    <View style={{
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      borderRadius: 12,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}>
                      <Text style={{ color: '#4ade80', fontSize: 10, fontWeight: '600' }}>
                        LIVE
                      </Text>
                    </View>
                  </View>

                  {/* Bottom Section - Game Info */}
                  <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 16,
                  }}>
                    {/* Bottom Gradient Overlay */}
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.9)']}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 120,
                      }}
                    />

                    {/* Game Title */}
                    <Text style={{
                      color: '#ffffff',
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginBottom: 8,
                      position: 'relative',
                      zIndex: 10,
                    }}>
                      {game.name}
                    </Text>

                    {/* Stats Row */}
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 12,
                      position: 'relative',
                      zIndex: 10,
                    }}>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#facc15', fontSize: 14, fontWeight: 'bold' }}>
                          💰 {game.coins}
                        </Text>
                        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>
                          Coins
                        </Text>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#4ade80', fontSize: 14, fontWeight: 'bold' }}>
                          🏆 {game.lobbies}
                        </Text>
                        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>
                          Lobbies
                        </Text>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#9b87f5', fontSize: 14, fontWeight: 'bold' }}>
                          👥 {game.players}
                        </Text>
                        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>
                          Players
                        </Text>
                      </View>
                    </View>

                    {/* Join Lobby Button */}
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'rgba(155, 135, 245, 0.9)',
                        borderRadius: 8,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        position: 'relative',
                        zIndex: 10,
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={{
                        color: '#ffffff',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: 14,
                      }}>
                        🎮 Join Lobby
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
