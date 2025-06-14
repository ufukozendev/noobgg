import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface BottomNavigationProps {
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
}

const navigationTabs = [
  {
    id: 'home',
    label: 'Home',
    icon: 'home-outline',
    iconActive: 'home',
  },
  {
    id: 'games',
    label: 'Games',
    icon: 'game-controller-outline',
    iconActive: 'game-controller',
  },
  {
    id: 'squad',
    label: 'Squad',
    icon: 'people-circle-outline',
    iconActive: 'people-circle',
  },
  {
    id: 'tournaments',
    label: 'Tournaments',
    icon: 'trophy-outline',
    iconActive: 'trophy',
    hasNotification: true,
  },
  {
    id: 'leaderboard',
    label: 'Ranks',
    icon: 'bar-chart-outline',
    iconActive: 'bar-chart',
  },
];

export function BottomNavigation({ 
  activeTab = 'home', 
  onTabPress 
}: BottomNavigationProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(600)}
      style={{
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden',
      }}
    >
      {/* Modern dark background with gaming theme */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#1a1625', // Gaming dark theme
          borderRadius: 35,
          borderWidth: 1,
          borderColor: 'rgba(155, 135, 245, 0.3)',
          shadowColor: '#9b87f5',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 12,
        }}
      >
        {/* Navigation Items Container */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}
        >
          {navigationTabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            
            return (
              <TouchableOpacity
                key={tab.id}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                  borderRadius: 18,
                  flex: 1,
                  maxWidth: 70,
                  position: 'relative',
                }}
                activeOpacity={0.7}
                onPress={() => {
                  onTabPress?.(tab.id);
                  console.log(`${tab.label} tab pressed`);
                }}
                accessibilityRole="button"
                accessibilityLabel={`${tab.label} tab`}
                accessibilityState={{ selected: isActive }}
              >
                {/* Active background with gaming gradient */}
                {isActive && (
                  <LinearGradient
                    colors={['rgba(155, 135, 245, 0.2)', 'rgba(111, 82, 244, 0.15)']}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 18,
                      borderWidth: 1,
                      borderColor: 'rgba(155, 135, 245, 0.4)',
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                )}
                
                {/* Icon with notification badge */}
                <View style={{ position: 'relative', marginBottom: 2 }}>
                  <Ionicons
                    name={isActive ? tab.iconActive : tab.icon}
                    size={isActive ? 24 : 22}
                    color={isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'}
                  />
                  
                  {/* Gaming notification badge (like "NEW" in reference) */}
                  {tab.hasNotification && (
                    <View
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        backgroundColor: '#9b87f5',
                        borderRadius: 8,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        minWidth: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: '#9b87f5',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.6,
                        shadowRadius: 4,
                        elevation: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 8,
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                        }}
                      >
                        NEW
                      </Text>
                    </View>
                  )}
                </View>
                
                {/* Label with gaming typography */}
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.8}
                  style={{
                    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                    fontSize: 10,
                    fontWeight: isActive ? '600' : '500',
                    textAlign: 'center',
                    letterSpacing: 0.3,
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {/* Bottom glow effect for gaming aesthetic */}
        <LinearGradient
          colors={['transparent', 'rgba(155, 135, 245, 0.1)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 20,
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
          }}
        />
      </View>
    </Animated.View>
  );
}
