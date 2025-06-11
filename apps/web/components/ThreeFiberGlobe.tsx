'use client';

import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Text, 
  useTexture,
  Sphere,
  Billboard
} from '@react-three/drei';
import * as THREE from 'three';
import { Globe, Users, MapPin, Link, Gamepad2, Mouse, ZoomIn, Target } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

// Gaming hubs data
const GAMING_HUBS = [
  { 
    name: "Istanbul", 
    lat: 41.0082, 
    lng: 28.9784, 
    players: 45000,
    games: ["Valorant", "CS2", "LoL"],
    color: "#ff6b6b",
    flag: "🇹🇷"
  },
  { 
    name: "New York", 
    lat: 40.7128, 
    lng: -74.006, 
    players: 120000,
    games: ["Valorant", "Fortnite", "Apex"],
    color: "#4ecdc4",
    flag: "🇺🇸"
  },
  { 
    name: "London", 
    lat: 51.5074, 
    lng: -0.1276, 
    players: 89000,
    games: ["CS2", "LoL", "PUBG"],
    color: "#45b7d1",
    flag: "🇬🇧"
  },
  { 
    name: "Tokyo", 
    lat: 35.6895, 
    lng: 139.6917, 
    players: 95000,
    games: ["LoL", "Valorant", "Street Fighter"],
    color: "#96ceb4",
    flag: "🇯🇵"
  },
  { 
    name: "Seoul", 
    lat: 37.5665, 
    lng: 126.9780, 
    players: 110000,
    games: ["LoL", "Overwatch", "StarCraft"],
    color: "#ffeaa7",
    flag: "🇰🇷"
  },
  { 
    name: "São Paulo", 
    lat: -23.5505, 
    lng: -46.6333, 
    players: 52000,
    games: ["CS2", "Valorant", "Free Fire"],
    color: "#fd79a8",
    flag: "🇧🇷"
  },
  { 
    name: "Berlin", 
    lat: 52.5200, 
    lng: 13.4050, 
    players: 67000,
    games: ["CS2", "LoL", "Rocket League"],
    color: "#a29bfe",
    flag: "🇩🇪"
  },
  { 
    name: "Sydney", 
    lat: -33.8688, 
    lng: 151.2093, 
    players: 38000,
    games: ["CS2", "Valorant", "Apex"],
    color: "#fd6c6c",
    flag: "🇦🇺"
  },
];

// Convert lat/lng to 3D coordinates
function latLngToVector3(lat: number, lng: number, radius: number = 5) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Globe rotation context for syncing all elements
const GlobeRotationContext = React.createContext<{ rotation: number }>({ rotation: 0 });

// Wireframe Earth Globe - Ultra Optimized with Rotation Sync
const EarthGlobe = React.memo(({ onRotationUpdate }: { onRotationUpdate?: (rotation: number) => void }) => {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
      if (onRotationUpdate && typeof onRotationUpdate === 'function') {
        onRotationUpdate(earthRef.current.rotation.y);
      }
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[5, 16, 8]} />
      <meshBasicMaterial 
        color="#2563eb" 
        wireframe={true}
        transparent={true}
        opacity={0.3}
      />
    </mesh>
  );
});

EarthGlobe.displayName = 'EarthGlobe';

// GitHub-Style Dotted Continents with Real World Pattern - Synced Rotation
const DottedContinents = React.memo(({ globeRotation }: { globeRotation: number }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Apply rotation to match the globe
  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = globeRotation;
    }
  });
  
  const pointsData = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const radius = 5.05; // Slightly above earth surface
      // Highly detailed and accurate continent mapping for realistic appearance
    const continentRegions = [
      // North America - Ultra detailed realistic mapping
      // Canada Arctic
      { lat: 75, lng: -100, count: 3, spread: 8 }, // Arctic Archipelago
      { lat: 70, lng: -105, count: 5, spread: 12 }, // Northern Canada
      { lat: 68, lng: -133, count: 4, spread: 10 }, // Northwest Territories
      { lat: 65, lng: -125, count: 6, spread: 8 }, // Yukon/NWT
      { lat: 65, lng: -95, count: 8, spread: 12 }, // Nunavut
      
      // Canada Main
      { lat: 60, lng: -125, count: 12, spread: 15 }, // British Columbia North
      { lat: 55, lng: -125, count: 15, spread: 12 }, // British Columbia
      { lat: 55, lng: -110, count: 18, spread: 15 }, // Alberta
      { lat: 55, lng: -105, count: 16, spread: 12 }, // Saskatchewan
      { lat: 55, lng: -95, count: 18, spread: 15 }, // Manitoba
      { lat: 50, lng: -85, count: 20, spread: 18 }, // Ontario
      { lat: 47, lng: -70, count: 15, spread: 12 }, // Quebec
      { lat: 46, lng: -63, count: 8, spread: 8 }, // Maritime Provinces
      { lat: 47, lng: -53, count: 4, spread: 6 }, // Newfoundland
      
      // United States
      { lat: 48, lng: -122, count: 8, spread: 6 }, // Washington
      { lat: 45, lng: -123, count: 10, spread: 8 }, // Oregon
      { lat: 40, lng: -120, count: 15, spread: 10 }, // California North
      { lat: 35, lng: -118, count: 12, spread: 8 }, // California South
      { lat: 40, lng: -111, count: 12, spread: 8 }, // Utah/Nevada
      { lat: 45, lng: -110, count: 10, spread: 8 }, // Montana/Wyoming
      { lat: 45, lng: -100, count: 15, spread: 12 }, // North Dakota
      { lat: 40, lng: -100, count: 18, spread: 15 }, // Nebraska/Kansas
      { lat: 35, lng: -100, count: 16, spread: 12 }, // Texas North
      { lat: 30, lng: -95, count: 14, spread: 10 }, // Texas East
      { lat: 28, lng: -100, count: 12, spread: 8 }, // Texas South
      { lat: 35, lng: -85, count: 18, spread: 12 }, // Tennessee/Kentucky
      { lat: 40, lng: -85, count: 20, spread: 15 }, // Great Lakes region
      { lat: 42, lng: -75, count: 16, spread: 10 }, // New York
      { lat: 40, lng: -75, count: 12, spread: 8 }, // Pennsylvania
      { lat: 35, lng: -80, count: 14, spread: 10 }, // Carolinas
      { lat: 30, lng: -85, count: 12, spread: 8 }, // Florida/Georgia
      { lat: 28, lng: -81, count: 8, spread: 6 }, // Florida
      { lat: 65, lng: -153, count: 6, spread: 12 }, // Alaska
      { lat: 21, lng: -158, count: 2, spread: 3 }, // Hawaii
      
      // Mexico and Central America
      { lat: 25, lng: -100, count: 12, spread: 8 }, // Mexico North
      { lat: 20, lng: -100, count: 14, spread: 10 }, // Mexico Central
      { lat: 18, lng: -95, count: 10, spread: 8 }, // Mexico South
      { lat: 15, lng: -90, count: 6, spread: 6 }, // Guatemala
      { lat: 10, lng: -85, count: 4, spread: 5 }, // Central America      // South America - Optimized realistic mapping
      { lat: 12, lng: -72, count: 8, spread: 2 }, // Venezuela North
      { lat: 8, lng: -68, count: 10, spread: 2 }, // Venezuela Central
      { lat: 4, lng: -67, count: 8, spread: 2 }, // Venezuela South
      { lat: 8, lng: -75, count: 10, spread: 2 }, // Colombia North
      { lat: 4, lng: -73, count: 12, spread: 2 }, // Colombia Central
      { lat: 0, lng: -72, count: 8, spread: 2 }, // Colombia South
      { lat: -2, lng: -78, count: 6, spread: 2 }, // Ecuador
      { lat: -8, lng: -75, count: 8, spread: 2 }, // Peru North
      { lat: -12, lng: -76, count: 10, spread: 2 }, // Peru Central
      { lat: -16, lng: -72, count: 8, spread: 2 }, // Peru South
      { lat: -16, lng: -65, count: 6, spread: 2 }, // Bolivia North
      { lat: -20, lng: -64, count: 8, spread: 2 }, // Bolivia South
      
      // Brazil - Optimized spread
      { lat: 5, lng: -60, count: 15, spread: 3 }, // Amazon North
      { lat: 0, lng: -55, count: 18, spread: 3 }, // Amazon Central
      { lat: -5, lng: -58, count: 20, spread: 3 }, // Amazon South
      { lat: -8, lng: -45, count: 15, spread: 3 }, // Northeast Brazil
      { lat: -12, lng: -40, count: 12, spread: 2 }, // Bahia
      { lat: -15, lng: -48, count: 18, spread: 3 }, // Central Brazil
      { lat: -20, lng: -45, count: 15, spread: 2 }, // Minas Gerais
      { lat: -23, lng: -47, count: 12, spread: 2 }, // São Paulo
      { lat: -25, lng: -50, count: 10, spread: 2 }, // Paraná
      { lat: -28, lng: -52, count: 8, spread: 2 }, // Rio Grande do Sul
      
      // Argentina & Chile - Optimized spread
      { lat: -25, lng: -58, count: 10, spread: 2 }, // Argentina North
      { lat: -30, lng: -62, count: 12, spread: 2 }, // Argentina Central
      { lat: -35, lng: -65, count: 15, spread: 3 }, // Argentina Central-South
      { lat: -40, lng: -68, count: 12, spread: 2 }, // Patagonia North
      { lat: -45, lng: -70, count: 10, spread: 2 }, // Patagonia Central
      { lat: -50, lng: -72, count: 6, spread: 2 }, // Patagonia South
      { lat: -25, lng: -70, count: 8, spread: 1 }, // Chile North
      { lat: -35, lng: -71, count: 10, spread: 4 }, // Chile Central
      { lat: -45, lng: -73, count: 8, spread: 4 }, // Chile South
      
      // Other South American countries
      { lat: -23, lng: -58, count: 6, spread: 6 }, // Paraguay
      { lat: -33, lng: -56, count: 4, spread: 4 }, // Uruguay
      { lat: 4, lng: -58, count: 6, spread: 6 }, // Guyana
      { lat: 4, lng: -56, count: 4, spread: 4 }, // Suriname
      { lat: 4, lng: -53, count: 3, spread: 3 }, // French Guiana      // Europe - Optimized realistic mapping
      { lat: 71, lng: 8, count: 3, spread: 2 }, // Northern Norway
      { lat: 69, lng: 20, count: 4, spread: 2 }, // Norwegian Lapland
      { lat: 68, lng: 27, count: 3, spread: 2 }, // Finnish Lapland
      { lat: 67, lng: 24, count: 4, spread: 2 }, // Swedish Lapland
      { lat: 65, lng: 15, count: 8, spread: 2 }, // Central Scandinavia
      { lat: 62, lng: 10, count: 10, spread: 2 }, // Southern Norway
      { lat: 60, lng: 15, count: 12, spread: 2 }, // Central Sweden
      { lat: 60, lng: 25, count: 10, spread: 2 }, // Southern Finland
      { lat: 57, lng: 12, count: 8, spread: 2 }, // Southern Sweden
      { lat: 56, lng: 10, count: 6, spread: 1 }, // Denmark
      { lat: 65, lng: -18, count: 3, spread: 1 }, // Iceland
      { lat: 62, lng: -7, count: 2, spread: 1 }, // Faroe Islands
      
      // British Isles - Optimized spread
      { lat: 58, lng: -4, count: 6, spread: 2 }, // Scotland North
      { lat: 55, lng: -4, count: 8, spread: 2 }, // Scotland Central
      { lat: 52, lng: -2, count: 10, spread: 2 }, // England Central
      { lat: 50, lng: -1, count: 8, spread: 2 }, // Southern England
      { lat: 52, lng: -8, count: 6, spread: 2 }, // Ireland Central
      { lat: 54, lng: -6, count: 5, spread: 1 }, // Northern Ireland
      
      // Western Europe - Optimized spread
      { lat: 50, lng: 3, count: 8, spread: 2 }, // Northern France
      { lat: 47, lng: 2, count: 10, spread: 2 }, // Central France
      { lat: 44, lng: 2, count: 8, spread: 2 }, // Southern France
      { lat: 50, lng: 8, count: 12, spread: 2 }, // Western Germany
      { lat: 51, lng: 10, count: 15, spread: 10 }, // Central Germany
      { lat: 48, lng: 11, count: 10, spread: 8 }, // Southern Germany
      { lat: 47, lng: 8, count: 6, spread: 5 }, // Switzerland
      { lat: 47, lng: 14, count: 6, spread: 6 }, // Austria
      { lat: 50, lng: 4, count: 6, spread: 4 }, // Belgium
      { lat: 52, lng: 5, count: 8, spread: 5 }, // Netherlands
      { lat: 49, lng: 6, count: 3, spread: 3 }, // Luxembourg
      
      // Central Europe
      { lat: 50, lng: 15, count: 10, spread: 8 }, // Czech Republic
      { lat: 48, lng: 19, count: 6, spread: 6 }, // Slovakia
      { lat: 52, lng: 19, count: 15, spread: 12 }, // Poland
      { lat: 47, lng: 20, count: 8, spread: 8 }, // Hungary
      { lat: 46, lng: 15, count: 6, spread: 6 }, // Slovenia
      { lat: 45, lng: 16, count: 6, spread: 6 }, // Croatia
      { lat: 44, lng: 18, count: 4, spread: 5 }, // Bosnia
      { lat: 44, lng: 21, count: 6, spread: 6 }, // Serbia
      { lat: 42, lng: 21, count: 4, spread: 4 }, // Montenegro/Kosovo
      { lat: 41, lng: 20, count: 4, spread: 4 }, // Albania
      { lat: 42, lng: 22, count: 6, spread: 6 }, // Bulgaria
      { lat: 46, lng: 25, count: 8, spread: 8 }, // Romania
      
      // Italy and Mediterranean
      { lat: 46, lng: 11, count: 6, spread: 5 }, // Northern Italy
      { lat: 42, lng: 12, count: 8, spread: 6 }, // Central Italy
      { lat: 40, lng: 16, count: 6, spread: 6 }, // Southern Italy
      { lat: 37, lng: 14, count: 4, spread: 4 }, // Sicily
      { lat: 40, lng: 9, count: 3, spread: 3 }, // Sardinia
      { lat: 35, lng: 25, count: 4, spread: 4 }, // Crete
      { lat: 39, lng: 22, count: 8, spread: 8 }, // Greece
      { lat: 35, lng: 33, count: 3, spread: 3 }, // Cyprus
      { lat: 36, lng: 28, count: 4, spread: 4 }, // Rhodes area
      
      // Iberian Peninsula
      { lat: 40, lng: -4, count: 12, spread: 10 }, // Central Spain
      { lat: 42, lng: -8, count: 6, spread: 6 }, // Northwestern Spain
      { lat: 37, lng: -4, count: 8, spread: 8 }, // Southern Spain
      { lat: 41, lng: 2, count: 6, spread: 6 }, // Catalonia
      { lat: 39, lng: 3, count: 3, spread: 3 }, // Balearic Islands
      { lat: 39, lng: -8, count: 8, spread: 8 }, // Central Portugal
      { lat: 41, lng: -8, count: 6, spread: 6 }, // Northern Portugal
      
      // Eastern Europe
      { lat: 60, lng: 30, count: 8, spread: 10 }, // Northern Russia (Karelia)
      { lat: 55, lng: 37, count: 15, spread: 12 }, // Central Russia (Moscow area)
      { lat: 50, lng: 30, count: 12, spread: 10 }, // Ukraine Central
      { lat: 49, lng: 32, count: 8, spread: 8 }, // Ukraine East
      { lat: 46, lng: 28, count: 6, spread: 6 }, // Moldova
      { lat: 54, lng: 28, count: 8, spread: 8 }, // Belarus
      { lat: 57, lng: 24, count: 6, spread: 6 }, // Baltic States
      { lat: 59, lng: 26, count: 4, spread: 4 }, // Estonia
      { lat: 57, lng: 25, count: 4, spread: 4 }, // Latvia
      { lat: 55, lng: 24, count: 4, spread: 4 }, // Lithuania      // Africa - Optimized realistic mapping
      { lat: 32, lng: -6, count: 8, spread: 2 }, // Morocco
      { lat: 30, lng: 3, count: 10, spread: 2 }, // Algeria
      { lat: 34, lng: 9, count: 6, spread: 2 }, // Tunisia
      { lat: 32, lng: 20, count: 8, spread: 2 }, // Libya
      { lat: 26, lng: 30, count: 12, spread: 2 }, // Egypt
      { lat: 15, lng: 30, count: 8, spread: 2 }, // Sudan North
      { lat: 10, lng: 30, count: 10, spread: 2 }, // Sudan South
      { lat: 9, lng: 38, count: 8, spread: 2 }, // Ethiopia
      { lat: 2, lng: 38, count: 6, spread: 2 }, // Kenya North
      { lat: -1, lng: 37, count: 8, spread: 2 }, // Kenya Central
      { lat: -6, lng: 35, count: 6, spread: 2 }, // Tanzania
      { lat: 15, lng: 0, count: 8, spread: 2 }, // Chad
      { lat: 12, lng: -2, count: 6, spread: 2 }, // Burkina Faso
      { lat: 10, lng: -8, count: 8, spread: 2 }, // Guinea
      { lat: 8, lng: -11, count: 6, spread: 2 }, // Sierra Leone
      { lat: 6, lng: -10, count: 5, spread: 1 }, // Liberia
      { lat: 8, lng: -1, count: 8, spread: 2 }, // Ghana
      { lat: 9, lng: 2, count: 10, spread: 2 }, // Nigeria
      { lat: 4, lng: 9, count: 8, spread: 2 }, // Cameroon
      { lat: 0, lng: 15, count: 8, spread: 2 }, // Central African Republic
      { lat: -4, lng: 15, count: 10, spread: 2 }, // Democratic Republic of Congo
      { lat: -9, lng: 13, count: 8, spread: 2 }, // Angola
      { lat: -22, lng: 17, count: 6, spread: 2 }, // Namibia
      { lat: -29, lng: 24, count: 10, spread: 2 }, // South Africa
      { lat: -19, lng: 23, count: 6, spread: 2 }, // Botswana
      { lat: -20, lng: 30, count: 6, spread: 2 }, // Zimbabwe
      { lat: -18, lng: 32, count: 6, spread: 2 }, // Mozambique
      { lat: -26, lng: 32, count: 4, spread: 4 }, // eSwatini
      { lat: -29, lng: 30, count: 4, spread: 4 }, // Lesotho
      { lat: -20, lng: 47, count: 6, spread: 6 }, // Madagascar      // Asia - Optimized realistic mapping
      // Siberia and Northern Asia - Optimized spread
      { lat: 70, lng: 100, count: 8, spread: 4 }, // Siberia North
      { lat: 68, lng: 80, count: 10, spread: 4 }, // West Siberia
      { lat: 65, lng: 120, count: 12, spread: 4 }, // Central Siberia
      { lat: 60, lng: 140, count: 10, spread: 4 }, // East Siberia
      { lat: 55, lng: 90, count: 15, spread: 4 }, // South Siberia
      
      // Central Asia - Optimized spread
      { lat: 50, lng: 65, count: 8, spread: 2 }, // Kazakhstan West
      { lat: 45, lng: 75, count: 10, spread: 3 }, // Kazakhstan Central
      { lat: 40, lng: 68, count: 6, spread: 2 }, // Uzbekistan
      { lat: 38, lng: 58, count: 4, spread: 2 }, // Turkmenistan
      { lat: 39, lng: 71, count: 4, spread: 2 }, // Tajikistan
      { lat: 41, lng: 75, count: 4, spread: 2 }, // Kyrgyzstan
      
      // China - Optimized spread
      { lat: 45, lng: 125, count: 12, spread: 3 }, // Northeast China (Manchuria)
      { lat: 40, lng: 115, count: 18, spread: 3 }, // North China Plain
      { lat: 35, lng: 110, count: 20, spread: 3 }, // Central China
      { lat: 30, lng: 120, count: 16, spread: 3 }, // Yangtze River Delta
      { lat: 25, lng: 115, count: 14, spread: 2 }, // South China
      { lat: 22, lng: 113, count: 8, spread: 2 }, // Pearl River Delta
      { lat: 35, lng: 85, count: 8, spread: 3 }, // Western China (Tibet)
      { lat: 43, lng: 87, count: 6, spread: 2 }, // Xinjiang
      { lat: 45, lng: 110, count: 8, spread: 3 }, // Inner Mongolia
      
      // Japan - Already optimized
      { lat: 43, lng: 142, count: 4, spread: 1 }, // Hokkaido
      { lat: 38, lng: 140, count: 6, spread: 1 }, // Honshu North
      { lat: 35, lng: 139, count: 8, spread: 1 }, // Honshu Central (Tokyo)
      { lat: 32, lng: 131, count: 4, spread: 1 }, // Kyushu
      { lat: 26, lng: 127, count: 2, spread: 1 }, // Okinawa
      
      // Korea - Already optimized
      { lat: 39, lng: 127, count: 4, spread: 1 }, // North Korea
      { lat: 36, lng: 128, count: 6, spread: 1 }, // South Korea
      
      // India and Subcontinent
      { lat: 32, lng: 77, count: 8, spread: 8 }, // Northern India (Kashmir)
      { lat: 28, lng: 77, count: 12, spread: 10 }, // North India (Delhi region)
      { lat: 26, lng: 83, count: 15, spread: 12 }, // Ganges Plain
      { lat: 23, lng: 78, count: 18, spread: 15 }, // Central India
      { lat: 19, lng: 73, count: 12, spread: 10 }, // Western India (Mumbai)
      { lat: 15, lng: 77, count: 14, spread: 12 }, // Deccan Plateau
      { lat: 11, lng: 78, count: 10, spread: 8 }, // South India
      { lat: 9, lng: 76, count: 6, spread: 6 }, // Kerala
      { lat: 13, lng: 80, count: 8, spread: 6 }, // Tamil Nadu
      { lat: 8, lng: 81, count: 4, spread: 4 }, // Sri Lanka
      
      // Pakistan and Afghanistan
      { lat: 30, lng: 70, count: 10, spread: 8 }, // Pakistan
      { lat: 33, lng: 65, count: 6, spread: 8 }, // Afghanistan
      
      // Southeast Asia
      { lat: 16, lng: 101, count: 8, spread: 8 }, // Thailand
      { lat: 14, lng: 108, count: 6, spread: 6 }, // Vietnam
      { lat: 12, lng: 105, count: 4, spread: 4 }, // Cambodia
      { lat: 18, lng: 105, count: 4, spread: 4 }, // Laos
      { lat: 21, lng: 106, count: 6, spread: 6 }, // Northern Vietnam
      { lat: 4, lng: 114, count: 4, spread: 4 }, // Brunei
      { lat: 4, lng: 102, count: 8, spread: 8 }, // Malaysia
      { lat: 1, lng: 104, count: 2, spread: 2 }, // Singapore
      
      // Indonesia
      { lat: 6, lng: 107, count: 8, spread: 6 }, // Java
      { lat: 0, lng: 109, count: 6, spread: 8 }, // Sumatra
      { lat: -2, lng: 115, count: 8, spread: 8 }, // Borneo (Kalimantan)
      { lat: -8, lng: 115, count: 4, spread: 4 }, // Bali
      { lat: -5, lng: 120, count: 6, spread: 6 }, // Sulawesi
      { lat: -3, lng: 135, count: 4, spread: 6 }, // Papua
      
      // Philippines
      { lat: 14, lng: 121, count: 6, spread: 4 }, // Luzon
      { lat: 10, lng: 123, count: 4, spread: 4 }, // Visayas
      { lat: 7, lng: 125, count: 4, spread: 4 }, // Mindanao
      
      // Middle East
      { lat: 32, lng: 53, count: 6, spread: 6 }, // Iran
      { lat: 33, lng: 44, count: 4, spread: 4 }, // Iraq
      { lat: 34, lng: 36, count: 4, spread: 4 }, // Syria
      { lat: 31, lng: 35, count: 3, spread: 3 }, // Israel/Palestine
      { lat: 31, lng: 36, count: 3, spread: 3 }, // Jordan
      { lat: 24, lng: 45, count: 8, spread: 8 }, // Saudi Arabia
      { lat: 26, lng: 50, count: 2, spread: 2 }, // Bahrain
      { lat: 25, lng: 51, count: 2, spread: 2 }, // Qatar
      { lat: 24, lng: 54, count: 3, spread: 3 }, // UAE
      { lat: 23, lng: 58, count: 3, spread: 3 }, // Oman
      { lat: 15, lng: 44, count: 4, spread: 4 }, // Yemen
      
      // Other Asian regions
      { lat: 40, lng: 45, count: 3, spread: 3 }, // Armenia
      { lat: 42, lng: 43, count: 3, spread: 3 }, // Georgia
      { lat: 40, lng: 48, count: 4, spread: 4 }, // Azerbaijan      // Australia & Oceania - Optimized realistic mapping
      { lat: -12, lng: 133, count: 6, spread: 2 }, // Northern Territory North
      { lat: -15, lng: 130, count: 8, spread: 2 }, // Northern Territory Central
      { lat: -20, lng: 130, count: 8, spread: 2 }, // Northern Territory South
      { lat: -17, lng: 142, count: 6, spread: 2 }, // Queensland North
      { lat: -22, lng: 145, count: 10, spread: 2 }, // Queensland Central
      { lat: -27, lng: 150, count: 8, spread: 2 }, // Queensland South (Brisbane)
      { lat: -33, lng: 151, count: 8, spread: 2 }, // New South Wales (Sydney)
      { lat: -37, lng: 145, count: 8, spread: 2 }, // Victoria (Melbourne)
      { lat: -35, lng: 139, count: 6, spread: 2 }, // South Australia (Adelaide)
      { lat: -32, lng: 116, count: 6, spread: 2 }, // Western Australia (Perth)
      { lat: -25, lng: 120, count: 8, spread: 3 }, // Western Australia Central
      { lat: -20, lng: 118, count: 6, spread: 2 }, // Western Australia North
      { lat: -42, lng: 147, count: 4, spread: 1 }, // Tasmania
      
      // New Zealand - Already optimized
      { lat: -37, lng: 175, count: 4, spread: 1 }, // North Island North
      { lat: -40, lng: 176, count: 4, spread: 1 }, // North Island South
      { lat: -43, lng: 171, count: 4, spread: 1 }, // South Island North
      { lat: -46, lng: 169, count: 3, spread: 1 }, // South Island South
      
      // Pacific Islands - Already optimized
      { lat: -18, lng: 178, count: 2, spread: 1 }, // Fiji
      { lat: -22, lng: 166, count: 1, spread: 1 }, // New Caledonia
      { lat: -17, lng: 168, count: 1, spread: 1 }, // Vanuatu
      { lat: -9, lng: 160, count: 1, spread: 1 }, // Solomon Islands
      { lat: -6, lng: 147, count: 1, spread: 1 }, // Papua New Guinea
        // Additional islands and major island chains
      { lat: 21, lng: -158, count: 3, spread: 2 }, // Hawaii main islands
      { lat: 28, lng: -16, count: 2, spread: 2 }, // Canary Islands
      { lat: 39, lng: 3, count: 2, spread: 2 }, // Balearic Islands
      { lat: 37, lng: 14, count: 2, spread: 2 }, // Sicily
      { lat: 40, lng: 9, count: 2, spread: 2 }, // Sardinia
      { lat: 35, lng: 33, count: 2, spread: 2 }, // Cyprus
      { lat: 35, lng: 25, count: 2, spread: 2 }, // Crete
      { lat: -20, lng: 57, count: 2, spread: 2 }, // Mauritius
      { lat: -21, lng: 55, count: 2, spread: 2 }, // Réunion
      { lat: 14, lng: -61, count: 2, spread: 2 }, // Caribbean islands
      { lat: 18, lng: -66, count: 2, spread: 2 }, // Puerto Rico
      { lat: 25, lng: -77, count: 2, spread: 2 }, // Bahamas
      { lat: 22, lng: -79, count: 2, spread: 2 }, // Cuba
      { lat: 18, lng: -77, count: 2, spread: 2 }, // Jamaica
    ];
    
    continentRegions.forEach(region => {
      for (let i = 0; i < region.count; i++) {
        const latOffset = (Math.random() - 0.5) * region.spread;
        const lngOffset = (Math.random() - 0.5) * region.spread;
        
        const lat = Math.max(-85, Math.min(85, region.lat + latOffset));
        const lng = region.lng + lngOffset;
        
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        
        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        positions.push(x, y, z);
        
        // Varied colors based on region
        const baseIntensity = 0.4 + Math.random() * 0.4;
        const greenVariation = 0.6 + Math.random() * 0.3;
        
        // Different shades of green/blue for different regions
        if (lat > 50) {
          // Northern regions - more blue
          colors.push(0.1 * baseIntensity, 0.7 * greenVariation, 0.9 * baseIntensity);
        } else if (lat < -20) {
          // Southern regions - more green
          colors.push(0.0 * baseIntensity, 0.9 * greenVariation, 0.4 * baseIntensity);
        } else {
          // Tropical/temperate - balanced
          colors.push(0.0 * baseIntensity, 0.8 * greenVariation, 0.6 * baseIntensity);
        }
      }
    });
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[pointsData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[pointsData.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors={true}
        transparent={true}
        opacity={0.85}
        sizeAttenuation={true}
      />
    </points>
  );
});

// Animated Gaming Hub Marker - Optimized with Globe Rotation Sync
const GamingHub = React.memo(({ hub, onHover, globeRotation }: { 
  hub: any, 
  onHover: (hub: any | null) => void,
  globeRotation: number 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const basePosition = useMemo(() => latLngToVector3(hub.lat, hub.lng, 5.15), [hub]);
  
  useFrame((state) => {
    // Apply globe rotation to the hub group
    if (groupRef.current) {
      groupRef.current.rotation.y = globeRotation;
    }
    
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + hub.players * 0.001) * 0.2;
      meshRef.current.scale.setScalar(scale);
      meshRef.current.lookAt(state.camera.position);
    }
    
    if (ringRef.current) {
      const ringScale = 1 + Math.sin(state.clock.elapsedTime * 3 + hub.players * 0.001) * 0.3;
      ringRef.current.scale.setScalar(ringScale);
      ringRef.current.rotation.z += 0.02;
      ringRef.current.lookAt(state.camera.position);
    }
  });
  return (
    <group ref={groupRef}>
      <group position={basePosition}>
        <mesh
          ref={ringRef}
          onPointerEnter={() => onHover(hub)}
          onPointerLeave={() => onHover(null)}
        >
          <ringGeometry args={[0.1, 0.2, 12]} />
          <meshBasicMaterial 
            color={hub.color} 
            transparent 
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        <mesh
          ref={meshRef}
          onPointerEnter={() => onHover(hub)}
          onPointerLeave={() => onHover(null)}
        >
          <sphereGeometry args={[0.06, 12, 8]} />
          <meshBasicMaterial color={hub.color} />
        </mesh>
        
        <Billboard position={[0, 0.25, 0]}>
          <Text
            fontSize={0.08}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#000000"
          >
            {hub.flag} {hub.name}
          </Text>
        </Billboard>
        
        <Billboard position={[0, -0.25, 0]}>
          <Text
            fontSize={0.05}
            color={hub.color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.005}
            outlineColor="#000000"
          >
            {(hub.players / 1000).toFixed(0)}K
          </Text>
        </Billboard>
      </group>
    </group>
  );
});

// Optimized Connection Lines
const ConnectionLines = React.memo(() => {
  const linesRef = useRef<THREE.Group>(null);
  
  const connections = useMemo(() => {
    const connectionPairs = [
      [0, 1], // Istanbul - New York
      [1, 2], // New York - London
      [2, 6], // London - Berlin
      [3, 4], // Tokyo - Seoul
      [0, 3], // Istanbul - Tokyo
      [4, 1], // Seoul - New York
    ];
    
    return connectionPairs.map(([i, j]) => {
      const hub1 = GAMING_HUBS[i];
      const hub2 = GAMING_HUBS[j];
      
      const pos1 = latLngToVector3(hub1.lat, hub1.lng, 5.1);
      const pos2 = latLngToVector3(hub2.lat, hub2.lng, 5.1);
      
      // Create curved path
      const midPoint = new THREE.Vector3()
        .addVectors(pos1, pos2)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(6); // Higher arc
      
      const curve = new THREE.QuadraticBezierCurve3(pos1, midPoint, pos2);
      const points = curve.getPoints(20);
      
      return { points, color: `hsl(${(i + j) * 30}, 70%, 60%)` };
    });
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, index) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
        material.opacity = 0.3 + Math.sin(state.clock.elapsedTime + index) * 0.2;
      });
    }
  });

  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(connection.points.flatMap(p => [p.x, p.y, p.z])),
                3
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={connection.color} 
            transparent 
            opacity={0.5}
            linewidth={2}
          />
        </line>      ))}
    </group>
  );
});

// Atmosphere with shader-like effect - Optimized
const Atmosphere = React.memo(() => {
  const atm1Ref = useRef<THREE.Mesh>(null);
  const atm2Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (atm1Ref.current) {
      atm1Ref.current.rotation.y += 0.0003;
      atm1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (atm2Ref.current) {
      atm2Ref.current.rotation.y += 0.0005;
      atm2Ref.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <>
      <mesh ref={atm1Ref}>
        <sphereGeometry args={[5.2, 32, 16]} />
        <meshBasicMaterial 
          color="#4fc3f7" 
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh ref={atm2Ref}>
        <sphereGeometry args={[5.4, 24, 12]} />
        <meshBasicMaterial 
          color="#3f51b5" 
          transparent 
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />      </mesh>
    </>
  );
});

// Starfield background component
const Starfield = React.memo(() => {
  const starsRef = useRef<THREE.Points>(null);
  const stars = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];    // Create 600 stars scattered in a large sphere (balanced amount)
    for (let i = 0; i < 600; i++) {// Random position in a large sphere - much farther back
      const radius = 150 + Math.random() * 100; // Stars very far from globe
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push(x, y, z);      // Different star colors (white, blue, yellow, red giants) - balanced visibility
      const starType = Math.random();
      if (starType < 0.7) {
        // White stars - slightly brighter
        colors.push(0.7, 0.7, 0.7);
      } else if (starType < 0.85) {
        // Blue stars - slightly brighter
        colors.push(0.5, 0.6, 0.8);
      } else if (starType < 0.95) {
        // Yellow stars - slightly brighter
        colors.push(0.7, 0.7, 0.5);
      } else {
        // Red giants - slightly brighter
        colors.push(0.7, 0.4, 0.3);
      }
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, []);
    // Gentle twinkling animation - optimized for performance
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001; // Very slow rotation
      
      // Less frequent size updates for better performance
      if (Math.floor(state.clock.elapsedTime * 2) % 3 === 0) {
        const material = starsRef.current.material as THREE.PointsMaterial;
        material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      }
    }
  });
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[stars.positions, 3]}
        />        <bufferAttribute
          attach="attributes-color"
          args={[stars.colors, 3]}
        />
      </bufferGeometry>      <pointsMaterial
        size={0.6}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.4}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={true}
      />
    </points>
  );
});

Starfield.displayName = 'Starfield';

// Main Scene Component - Memoized to prevent unnecessary re-renders with Globe Rotation Sync
const Scene = React.memo(({ onHubHover, isMobile }: { onHubHover: (hub: any | null) => void, isMobile: boolean }) => {
  const [globeRotation, setGlobeRotation] = useState(0);

  const handleRotationUpdate = useCallback((rotation: number) => {
    if (typeof rotation === 'number' && !isNaN(rotation)) {
      setGlobeRotation(rotation);
    }
  }, []);
  return (
    <>
      {/* Stars first - rendered in background */}
      <Starfield />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#4fc3f7" />
      
      <EarthGlobe onRotationUpdate={handleRotationUpdate} />
      <DottedContinents globeRotation={globeRotation} />
      <Atmosphere />
      
      {GAMING_HUBS.map((hub, index) => (
        <GamingHub 
          key={`hub-${index}`} 
          hub={hub} 
          onHover={onHubHover} 
          globeRotation={globeRotation}
        />
      ))}
      
      <ConnectionLines />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        zoomSpeed={0.8}
        rotateSpeed={0.5}
        minDistance={isMobile ? 15 : 8}
        maxDistance={isMobile ? 40 : 30}
        autoRotate={false}
        makeDefault      />
    </>
  );
});

Scene.displayName = 'Scene';

// Error Boundary for WebGL context issues - Enhanced
class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorInfo: string | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('WebGL Error Boundary caught:', error);
    return { 
      hasError: true, 
      errorInfo: error.message.includes('context') ? 'WebGL Context Issue' : 'Rendering Error'
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('WebGL Error Details:', error, errorInfo);
    
    // Attempt automatic recovery for context loss
    if (error.message.includes('context') || error.message.includes('WebGL')) {
      setTimeout(() => {
        this.setState({ hasError: false, errorInfo: null });
      }, 3000);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center w-full h-[800px] bg-gradient-to-b from-purple-900/20 to-blue-900/20 rounded-xl">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-4">⚠️ {this.state.errorInfo || 'WebGL Error'}</div>
            <p className="text-white text-sm mb-4">
              {this.state.errorInfo === 'WebGL Context Issue' 
                ? 'Graphics context will be restored automatically...' 
                : 'Unable to load 3D Globe'}
            </p>
            {this.state.errorInfo === 'WebGL Context Issue' ? (
              <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
            ) : (
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                Reload Page
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main Component with optimizations for WebGL stability
export default function OptimizedGamingGlobe() {
  const [hoveredHub, setHoveredHub] = useState<any>(null);
  const [webglError, setWebglError] = useState(false);
  const [isContextLost, setIsContextLost] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0); // Force remount canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  // Memoize hover handler to prevent unnecessary re-renders
  const handleHubHover = useCallback((hub: any | null) => {
    setHoveredHub(hub);
  }, []);
  // Memoize scene props to prevent Canvas re-creation
  const sceneProps = useMemo(() => ({
    onHubHover: handleHubHover,
    isMobile: isMobile
  }), [handleHubHover, isMobile]);  // Memoize camera settings to prevent re-creation - Mobile Responsive
  const cameraSettings = useMemo(() => ({
    position: [0, 0, isMobile ? 24 : 15] as [number, number, number], // 80% zoom out on mobile (24 vs 15)
    fov: 50
  }), [isMobile]);

  // Enhanced GL settings with context loss handling
  const glSettings = useMemo(() => ({
    antialias: false,
    alpha: true,
    powerPreference: "default" as const, // Changed from low-power for better stability
    preserveDrawingBuffer: true, // Enable for context recovery
    failIfMajorPerformanceCaveat: false,
    stencil: false,
    depth: true,
    premultipliedAlpha: true
  }), []);
  // WebGL Context Loss/Restore Handler with Canvas Remount
  React.useEffect(() => {
    const handleContextLost = (event: Event) => {
      console.warn('WebGL context lost, preventing default and remounting...');
      event.preventDefault();
      setIsContextLost(true);
      
      // Force canvas remount after a delay
      setTimeout(() => {
        setCanvasKey(prev => prev + 1);
        setIsContextLost(false);
        setWebglError(false);
      }, 1500);
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      // Don't immediately reset states, let the timeout handle it
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);

      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }
  }, [canvasKey]); // Re-attach listeners when canvas remounts

  // Error recovery mechanism
  const handleWebGLError = useCallback(() => {
    setWebglError(true);
    // Attempt to recover after a short delay
    setTimeout(() => {
      setWebglError(false);
      setIsContextLost(false);
    }, 2000);
  }, []);

  // Cleanup and error recovery
  React.useEffect(() => {
    return () => {
      // Safe cleanup on component unmount
      try {
        if (canvasRef.current) {
          const gl = canvasRef.current.getContext('webgl2') || canvasRef.current.getContext('webgl');
          if (gl && !gl.isContextLost()) {
            // Only attempt cleanup if context is not already lost
            const loseContext = gl.getExtension('WEBGL_lose_context');
            if (loseContext) {
              setTimeout(() => {
                try {
                  loseContext.loseContext();
                } catch (e) {
                  console.warn('Context cleanup warning:', e);
                }
              }, 100);
            }
          }
        }
      } catch (error) {
        console.warn('WebGL cleanup warning:', error);
      }
    };
  }, []);

  return(    <WebGLErrorBoundary>
      <div className="relative w-full h-[800px] bg-transparent">
        {/* WebGL Context Lost Overlay */}
        {isContextLost && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-yellow-400 text-lg mb-4">⚠️ Context Restoring...</div>
              <p className="text-white text-sm mb-2 sm:mb-3">WebGL context is being restored</p>
              <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
            </div>
          </div>
        )}
        
        {!webglError && !isContextLost ? (
          <Canvas
            ref={canvasRef}
            camera={cameraSettings}
            gl={glSettings}
            dpr={[1, 1.5]} // Slightly increased for better quality
            performance={{ min: 0.5 }} // Increased performance threshold
            frameloop="always" // Changed back to always for smoother experience
            onError={handleWebGLError}
            onCreated={({ gl }) => {
              // Add context loss simulation for testing (remove in production)
              // const ext = gl.getExtension('WEBGL_lose_context');
              // setTimeout(() => ext?.loseContext(), 5000);
            }}          >
            <Scene {...sceneProps} />
          </Canvas>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-center">
              <div className="text-red-400 text-lg mb-4">⚠️ WebGL Error</div>
              <p className="text-white text-sm mb-4">Graphics context encountered an issue</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        )}        {/* Stats Panel - Mobile Optimized */}
      <div className={`absolute transition-all duration-200 bg-black/85 backdrop-blur-md rounded-lg border border-purple-500/30 shadow-2xl ${
        isMobile 
          ? 'top-2 left-2 right-2 p-3' 
          : 'top-4 left-4 p-4 rounded-xl max-w-[280px]'
      }`}
           style={{ touchAction: 'pan-y' }}>
        <h3 className={`text-purple-400 font-bold mb-2 flex items-center gap-2 ${
          isMobile ? 'text-sm justify-center' : 'text-base md:text-lg justify-start'
        }`}>
          <Globe className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4 md:w-5 md:h-5'}`} />
          <span className={isMobile ? '' : 'hidden md:inline'}>
            {isMobile ? 'noob.gg' : 'noob.gg Gaming Network'}
          </span>
          {!isMobile && <span className="hidden sm:inline md:hidden">noob.gg Network</span>}
        </h3>
        
        {/* Mobile: Grid Layout, Desktop: List Layout */}
        <div className={isMobile 
          ? 'grid grid-cols-3 gap-2 text-xs' 
          : 'space-y-2 text-sm'
        }>
          <div className={`${isMobile 
            ? 'flex flex-col items-center text-center p-2 bg-purple-500/10 rounded-lg' 
            : 'flex justify-between items-center gap-2'
          }`}>
            <span className={`text-gray-300 flex items-center gap-1.5 ${
              isMobile ? 'flex-col mb-1' : 'flex-shrink-0'
            }`}>
              <Users className="w-3.5 h-3.5" />
              <span className={isMobile ? 'text-xs' : 'hidden md:inline'}>
                {isMobile ? 'Players' : 'Total Players:'}
              </span>
              {!isMobile && <span className="hidden sm:inline md:hidden">Players:</span>}
            </span>
            <span className={`text-purple-400 font-semibold ${
              isMobile ? 'text-sm' : 'text-sm whitespace-nowrap'
            }`}>
              {(GAMING_HUBS.reduce((sum, hub) => sum + hub.players, 0) / 1000).toFixed(0)}k
            </span>
          </div>
          
          <div className={`${isMobile 
            ? 'flex flex-col items-center text-center p-2 bg-blue-500/10 rounded-lg' 
            : 'flex justify-between items-center gap-2'
          }`}>
            <span className={`text-gray-300 flex items-center gap-1.5 ${
              isMobile ? 'flex-col mb-1' : 'flex-shrink-0'
            }`}>
              <MapPin className="w-3.5 h-3.5" />
              <span className={isMobile ? 'text-xs' : 'hidden md:inline'}>
                {isMobile ? 'Hubs' : 'Active Hubs:'}
              </span>
              {!isMobile && <span className="hidden sm:inline md:hidden">Hubs:</span>}
            </span>
            <span className={`text-blue-400 font-semibold ${
              isMobile ? 'text-sm' : 'text-sm'
            }`}>
              {GAMING_HUBS.length}
            </span>
          </div>
          
          <div className={`${isMobile 
            ? 'flex flex-col items-center text-center p-2 bg-green-500/10 rounded-lg' 
            : 'flex justify-between items-center gap-2'
          }`}>
            <span className={`text-gray-300 flex items-center gap-1.5 ${
              isMobile ? 'flex-col mb-1' : 'flex-shrink-0'
            }`}>
              <Link className="w-3.5 h-3.5" />
              <span className={isMobile ? 'text-xs' : 'hidden sm:inline'}>
                {isMobile ? 'Status' : 'Connections:'}
              </span>
              {!isMobile && <span className="sm:hidden">Connect:</span>}
            </span>
            <span className={`text-green-400 font-semibold flex items-center gap-1 ${
              isMobile ? 'text-sm' : 'text-sm'
            }`}>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              Live
            </span>
          </div>
        </div>
      </div>{/* Hub Info Panel - Full Width Centered */}
      {hoveredHub && (
        <div className="absolute bottom-20 left-0 right-0 mx-0 w-full sm:top-1/2 sm:left-1/2 sm:right-auto sm:bottom-auto sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:mx-0 bg-black/95 backdrop-blur-lg text-white rounded-2xl p-4 sm:p-6 border-2 border-purple-500/50 shadow-2xl sm:w-[95vw] sm:max-w-[700px]"
             style={{ touchAction: 'pan-y' }}><div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="text-2xl sm:text-3xl">{hoveredHub.flag}</div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">{hoveredHub.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: hoveredHub.color }}
                ></div>
                <span className="text-xs sm:text-sm text-gray-400">Gaming Hub</span>
              </div>
            </div>
          </div>
            <div className="space-y-3 sm:space-y-4">
            <div className="bg-purple-500/20 rounded-lg p-2.5 sm:p-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Active Players</span>
                  <span className="sm:hidden">Players</span>
                </span>
                <span className="text-purple-400 font-bold text-lg sm:text-xl">
                  {hoveredHub.players.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                <Gamepad2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Popular Games</span>
                <span className="sm:hidden">Games</span>
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {hoveredHub.games.map((game: string) => (
                  <span 
                    key={game}
                    className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white rounded-full text-xs sm:text-sm border border-purple-400/50 backdrop-blur-sm"
                  >
                    {game}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-2 sm:pt-3 border-t border-gray-700">
              <p className="text-gray-400 text-xs leading-relaxed flex items-start gap-2">
                <Globe className="w-3 h-3 mt-0.5 flex-shrink-0" />
                Join this thriving gaming community and connect with {hoveredHub.players.toLocaleString()} active players from {hoveredHub.name}!
              </p>
            </div>
          </div>
        </div>
      )}      {/* Controls - Mobile Optimized and Higher Position */}
      <div className="absolute bottom-16 sm:bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-full px-4 py-2.5 sm:px-6 sm:py-3 border border-purple-500/40 shadow-lg"
           style={{ touchAction: 'pan-y' }}>
        <p className="text-gray-300 text-sm sm:text-sm text-center flex items-center justify-center gap-3 sm:gap-4">
          <span className="flex items-center gap-1.5">
            <Mouse className="w-4 h-4 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">Drag to rotate</span>
            <span className="sm:hidden">Drag</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ZoomIn className="w-4 h-4 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">Scroll to zoom</span>
            <span className="sm:hidden">Zoom</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Target className="w-4 h-4 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">Hover hubs for info</span>
            <span className="sm:hidden">Touch</span>
          </span>
        </p>
      </div>
      
      {/* WebGL Status Indicator - Bottom right on desktop, centered on mobile */}
      <div className={`absolute bottom-4 ${isMobile ? 'left-1/2 transform -translate-x-1/2' : 'right-4 left-auto transform-none'} flex items-center gap-2 bg-black/70 backdrop-blur-md rounded-lg px-3 py-1.5 sm:px-3 sm:py-2 border border-purple-500/30 shadow-md`}
           style={{ touchAction: 'pan-y' }}>
        <div className={`w-2 h-2 rounded-full ${isContextLost ? 'bg-yellow-400 animate-pulse' : webglError ? 'bg-red-400' : 'bg-green-400 animate-pulse'}`}></div>
        <span className="text-green-400 text-xs font-medium">
          {isContextLost ? 'Restoring...' : webglError ? 'Error' : 'WebGL Active'}
        </span>
      </div>
    </div>
    </WebGLErrorBoundary>
  );
}