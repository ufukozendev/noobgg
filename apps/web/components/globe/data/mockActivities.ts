import { CommunityActivity } from '../types/activity';
import { MAJOR_CITIES } from '../data/cities';

// Generate realistic mock activities
export const generateMockActivities = (): CommunityActivity[] => {
  const activities: CommunityActivity[] = [];
  const now = new Date();
  
  // Sample activities for different cities
  const activityTemplates = [
    {
      type: 'matchmaking' as const,
      titles: ['Players waiting for match', 'Quick match lobby', 'Ranked queue active'],
      descriptions: ['Looking for teammates', 'Competitive match starting soon', 'Join the action']
    },
    {
      type: 'tournament' as const,
      titles: ['Championship live', 'Weekly tournament', 'Esports event'],
      descriptions: ['Finals in progress', 'Registration open', 'Watch live streams']
    },
    {
      type: 'squad_formation' as const,
      titles: ['New squad forming', 'Team recruitment', 'Looking for members'],
      descriptions: ['Join our clan', 'Skilled players wanted', 'Building dream team']
    },
    {
      type: 'game_session' as const,
      titles: ['Live game session', 'Streaming now', 'Epic battle'],
      descriptions: ['Watch the action', 'Join spectators', 'Intense gameplay']
    },
    {
      type: 'event' as const,
      titles: ['Special event', 'Community gathering', 'Launch celebration'],
      descriptions: ['Limited time rewards', 'Meet other players', 'Exclusive content']
    }
  ];

  // Generate activities for random cities
  const selectedCities = MAJOR_CITIES.slice(0, 15); // Use first 15 cities
  
  selectedCities.forEach((city, index) => {
    const numActivities = Math.floor(Math.random() * 3) + 1; // 1-3 activities per city
    
    for (let i = 0; i < numActivities; i++) {
      const template = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
      const titleIndex = Math.floor(Math.random() * template.titles.length);
      
      const minutesAgo = Math.floor(Math.random() * 30) + 1; // 1-30 minutes ago
      const timestamp = new Date(now.getTime() - minutesAgo * 60 * 1000);
      
      activities.push({
        id: `${city.name}-${template.type}-${i}-${Date.now()}`,
        type: template.type,
        city: city.name,
        country: city.country,
        playerCount: Math.floor(Math.random() * 50) + 1,
        title: template.titles[titleIndex],
        description: template.descriptions[titleIndex],
        timestamp,
        status: Math.random() > 0.3 ? 'active' : 'waiting',
        gameType: ['CS2', 'Valorant', 'League of Legends', 'Fortnite', 'Apex Legends'][Math.floor(Math.random() * 5)],
        priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
      });
    }
  });

  // Sort by timestamp (newest first)
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Generate fresh activities every few seconds
export const useRealtimeActivities = () => {
  const [activities, setActivities] = useState<CommunityActivity[]>([]);
  
  useEffect(() => {
    // Initial load
    setActivities(generateMockActivities());
    
    // Update every 10 seconds
    const interval = setInterval(() => {
      setActivities(generateMockActivities());
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  return activities;
};

// Hook will be moved to separate file, just placeholder import
import { useState, useEffect } from 'react';
