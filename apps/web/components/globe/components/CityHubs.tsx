'use client';

import React, { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { CityData } from '../types';
import { MAJOR_CITIES } from '../data/cities';

interface CityHubsProps {
  orbitControlsRef: React.RefObject<OrbitControlsImpl | null>;
  onCityClick?: (city: CityData) => void;
  highlightedCity?: string | null;
}

interface CityHubProps {
  city: CityData;
  onClick?: (city: CityData) => void;
  isHighlighted?: boolean;
}

// Individual City Hub Component
const CityHub = React.memo(({ city, onClick, isHighlighted = false }: CityHubProps) => {
  // Convert lat/lng to 3D coordinates
  const position = useMemo(() => {
    const phi = (90 - city.lat) * (Math.PI / 180);
    const theta = (city.lng + 180) * (Math.PI / 180);

    return new THREE.Vector3(
      -(5.1 * Math.sin(phi) * Math.cos(theta)),
      5.1 * Math.cos(phi),
      5.1 * Math.sin(phi) * Math.sin(theta)
    );
  }, [city.lat, city.lng]);

  // Get hub color and size based on city type and highlight state
  const { color, size, glowColor } = useMemo(() => {
    const baseConfig = (() => {
      switch (city.type) {
        case 'megacity':
          return { color: '#ff6b6b', size: 0.12, glowColor: '#ff9999' }; // Red for megacities
        case 'capital':
          return { color: '#4ecdc4', size: 0.10, glowColor: '#7ee8e0' }; // Cyan for capitals
        default:
          return { color: '#45b7d1', size: 0.08, glowColor: '#78c5e7' }; // Blue for major cities
      }
    })();

    // Override with highlight colors if highlighted
    if (isHighlighted) {
      return {
        color: '#FFD700', // Gold when highlighted
        size: baseConfig.size * 1.5, // Larger when highlighted
        glowColor: '#FFEA00'
      };
    }

    return baseConfig;
  }, [city.type, isHighlighted]);

  const handleClick = useCallback((event: any) => {
    event.stopPropagation();
    onClick?.(city);
  }, [city, onClick]);

  const handlePointerEnter = useCallback(() => {
    document.body.style.cursor = 'pointer';
  }, []);

  const handlePointerLeave = useCallback(() => {
    document.body.style.cursor = 'default';
  }, []);
  return (
    <group position={position}>
      {/* Glow effect for highlighted cities */}
      {isHighlighted && (
        <mesh>
          <sphereGeometry args={[size * 2, 16, 16]} />
          <meshBasicMaterial
            color={glowColor}
            transparent={true}
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Main city dot */}
      <mesh
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <sphereGeometry args={[size, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent={true}
          opacity={isHighlighted ? 1.0 : 0.9}
        />
      </mesh>

      {/* Pulsing ring for highlighted cities */}
      {isHighlighted && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.5, size * 2, 16]} />
          <meshBasicMaterial
            color={color}
            transparent={true}
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* City name label */}
      <Billboard
        position={[0, size + 0.15, 0]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          color="#ffffff"
          anchorX="center"
          anchorY="bottom"
          fontSize={0.12}
          outlineWidth={0.008}
          outlineColor="#000000"
          maxWidth={3}
          textAlign="center"
          fontWeight="bold"
        >
          {city.name}
        </Text>
      </Billboard>
    </group>
  );
});

CityHub.displayName = 'CityHub';

// City Hubs Container Component
export const CityHubs = React.memo(({ orbitControlsRef, onCityClick, highlightedCity }: CityHubsProps) => {
  const groupRef = useRef<THREE.Group>(null);

  // Apply rotation to match the globe view from OrbitControls
  useFrame(() => {
    if (groupRef.current && orbitControlsRef.current) {
      groupRef.current.rotation.y = -orbitControlsRef.current.getAzimuthalAngle();
    }
  });

  return (
    <group ref={groupRef}>
      {MAJOR_CITIES.map((city, index) => (
        <CityHub
          key={`${city.name}-${index}`}
          city={city}
          onClick={onCityClick}
          isHighlighted={highlightedCity === city.name}
        />
      ))}
    </group>
  );
});

CityHubs.displayName = 'CityHubs';
