'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Starfield = React.memo(() => {
  const starsRef = useRef<THREE.Points>(null);
  
  const stars = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    
    // Create 600 stars scattered in a large sphere (balanced amount)
    for (let i = 0; i < 600; i++) {
      // Random position in a large sphere - much farther back
      const radius = 150 + Math.random() * 100; // Stars very far from globe
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.push(x, y, z);
      
      // Different star colors (white, blue, yellow, red giants) - balanced visibility
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
        />
        <bufferAttribute
          attach="attributes-color"
          args={[stars.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
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
