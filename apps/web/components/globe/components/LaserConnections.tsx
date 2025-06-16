'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CityData } from '../types';

interface LaserConnectionsProps {
  cities: CityData[];
  maxConnections?: number;
  orbitControlsRef: React.RefObject<any>;
  animationSpeed?: number;
  brightness?: number;
  showAllConnections?: boolean;
}

export const LaserConnections = React.memo(({ 
  cities, 
  maxConnections = 50, 
  orbitControlsRef, 
  animationSpeed = 1.0,
  brightness = 1.0,
  showAllConnections = true 
}: LaserConnectionsProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.LineBasicMaterial[]>([]);

  // Apply rotation to match the globe view from OrbitControls - SAME as CityHubs
  useFrame(() => {
    if (groupRef.current && orbitControlsRef.current) {
      groupRef.current.rotation.y = -orbitControlsRef.current.getAzimuthalAngle();
    }
  });  // Generate connections between ALL cities
  const connections = useMemo(() => {
    const cityConnections: Array<{ start: THREE.Vector3; end: THREE.Vector3; color: THREE.Color; distance: number; startIndex: number; endIndex: number }> = [];
    
    // Convert cities to 3D positions - EXACT SAME as CityHubs
    const cityPositions = cities.map((city, index) => {
      const phi = (90 - city.lat) * (Math.PI / 180);
      const theta = (city.lng + 180) * (Math.PI / 180);

      return {
        position: new THREE.Vector3(
          -(5.1 * Math.sin(phi) * Math.cos(theta)),
          5.1 * Math.cos(phi),
          5.1 * Math.sin(phi) * Math.sin(theta)
        ),
        city,
        index
      };
    });

    // Create connections between ALL cities for a full network
    for (let i = 0; i < cityPositions.length; i++) {
      for (let j = i + 1; j < cityPositions.length; j++) {
        const cityA = cityPositions[i];
        const cityB = cityPositions[j];
        
        // Calculate distance for color intensity
        const distance = cityA.position.distanceTo(cityB.position);
        
        // Dynamic color based on distance and city types
        let laserColor = new THREE.Color('#00ccff'); // Default cyan
        
        // Special colors for megacities and capitals
        if (cityA.city.type === 'megacity' || cityB.city.type === 'megacity') {
          laserColor = new THREE.Color('#ff0080'); // Magenta for megacities
        } else if (cityA.city.type === 'capital' || cityB.city.type === 'capital') {
          laserColor = new THREE.Color('#00ff80'); // Green for capitals
        }
        
        // Adjust color intensity based on distance (closer = brighter)
        const distanceIntensity = Math.max(0.3, 1.0 - (distance / 10.0));
        laserColor.multiplyScalar(distanceIntensity);

        cityConnections.push({
          start: cityA.position.clone(),
          end: cityB.position.clone(),
          color: laserColor,
          distance,
          startIndex: i,
          endIndex: j
        });
      }
    }

    // Sort by distance and limit total connections if needed
    return cityConnections
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxConnections || cityConnections.length);
  }, [cities, maxConnections]);  // Star Wars style laser firing animation
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    materialsRef.current.forEach((material, index) => {
      if (material && connections[index]) {
        const connection = connections[index];
        
        // Rapid firing effect - each laser fires independently
        const fireRate = 3.0 + (index % 5) * 0.5; // Different firing rates
        const firePhase = (time * fireRate * animationSpeed + index * 1.5) % (Math.PI * 2);
        
        // Firing burst - quick bright flash then fade
        let firingIntensity = 0.1;
        const burstPosition = (time * fireRate * animationSpeed + index * 1.5) % 3.0;
        
        if (burstPosition < 0.1) {
          // Initial bright burst
          firingIntensity = 1.0;
        } else if (burstPosition < 0.3) {
          // Quick fade
          firingIntensity = 1.0 - ((burstPosition - 0.1) / 0.2) * 0.8;
        } else if (burstPosition < 0.5) {
          // Sustain
          firingIntensity = 0.3;
        } else {
          // Rest period
          firingIntensity = 0.1;
        }
        
        // Energy pulse along the beam
        const pulseSpeed = 4.0 * animationSpeed;
        const pulse = Math.sin(time * pulseSpeed + index * 0.8) * 0.3 + 0.7;
        
        // Distance-based intensity (closer connections are brighter)
        const distanceIntensity = Math.max(0.3, 1.0 - (connection.distance / 10.0));
        
        // Combine all effects with brightness control
        const finalIntensity = firingIntensity * pulse * distanceIntensity * brightness;
        material.opacity = Math.max(0.1, finalIntensity);
        
        // Dynamic color - white core with colored tint
        const baseColor = connection.color.clone();
        const whiteCore = new THREE.Color('#ffffff');
        const blendedColor = whiteCore.lerp(baseColor, 0.3); // More white for laser effect
        
        material.color.copy(blendedColor).multiplyScalar(finalIntensity);
      }
    });
  });  return (
    <group ref={groupRef}>      {connections.map((connection, index) => {
        // Create 3D curved laser beam following sphere surface
        const startPos = connection.start.clone();
        const endPos = connection.end.clone();
        
        // Calculate multiple intermediate points for sphere-following curve
        const numPoints = 8;
        const points: THREE.Vector3[] = [];
        
        for (let i = 0; i <= numPoints; i++) {
          const t = i / numPoints;
          
          // Spherical interpolation (slerp) for natural sphere surface curve
          const interpolated = new THREE.Vector3().lerpVectors(startPos, endPos, t);
          
          // Project point onto sphere surface with height variation
          interpolated.normalize();
            // Add dynamic height based on position and curve intensity
          const heightVariation = Math.sin(t * Math.PI) * 0.3; // Reduced arc height
          const baseRadius = 5.1;
          const curveRadius = baseRadius + heightVariation;
          
          interpolated.multiplyScalar(curveRadius);
          points.push(interpolated);
        }
        
        // Create smooth curve through all points
        const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
        const finalPoints = curve.getPoints(32);
        const geometry = new THREE.BufferGeometry().setFromPoints(finalPoints);

        // Create multiple laser layers for Star Wars effect
        return (
          <group key={index}>
            {/* Outer glow - thick beam */}
            <primitive 
              object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: connection.color,
                transparent: true,
                opacity: 0.3,
                linewidth: 8
              }))} 
            />
            
            {/* Middle beam - medium thickness */}
            <primitive 
              object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: connection.color.clone().multiplyScalar(1.5),
                transparent: true,
                opacity: 0.6,
                linewidth: 4
              }))} 
            />            {/* Inner core - bright and thin */}
            <primitive 
              object={(() => {
                const material = new THREE.LineBasicMaterial({
                  color: new THREE.Color('#ffffff'), // Bright white core
                  transparent: true,
                  opacity: 1.0,
                  linewidth: 2
                });
                materialsRef.current[index] = material;
                return new THREE.Line(geometry, material);
              })()} 
            />

            {/* Add point lights at both ends for glow effect */}
            <pointLight
              position={startPos}
              color={connection.color}
              intensity={0.5}
              distance={2}
              decay={2}
            />
            <pointLight
              position={endPos}
              color={connection.color}
              intensity={0.5}
              distance={2}
              decay={2}
            />
          </group>
        );
      })}
    </group>
  );
});

LaserConnections.displayName = 'LaserConnections';
