'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { CountryData } from '../types';
import { formatCountryName } from '../utils/helpers';

interface CountryMarkerProps {
  country: CountryData;
  onHover: (country: CountryData | null) => void;
  orbitControlsRef: React.RefObject<OrbitControlsImpl | null>;
  onClick?: () => void;
}

export const CountryMarker = React.memo(({ 
  country, 
  onHover, 
  orbitControlsRef, 
  onClick 
}: CountryMarkerProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Use first coordinate as center point for the marker
  const basePosition = useMemo(() => {
    if (country.coordinates.length > 0) {
      const [lng, lat] = country.coordinates[0];
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);

      return new THREE.Vector3(
        -(5.15 * Math.sin(phi) * Math.cos(theta)),
        5.15 * Math.cos(phi),
        5.15 * Math.sin(phi) * Math.sin(theta)
      );
    }
    return new THREE.Vector3(0, 0, 0);
  }, [country.coordinates]);

  useFrame((state) => {
    // Apply globe rotation to the marker group
    if (groupRef.current && orbitControlsRef.current) {
      groupRef.current.rotation.y = -orbitControlsRef.current.getAzimuthalAngle();
    }

    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      meshRef.current.scale.setScalar(scale);
      meshRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group ref={groupRef}>
      <group position={basePosition}>
        <mesh
          ref={meshRef}
          onPointerEnter={() => onHover(country)}
          onPointerLeave={() => onHover(null)}
          onClick={onClick}
        >
          <sphereGeometry args={[0.03, 8, 6]} />
          <meshBasicMaterial color={country.color} />
        </mesh>
        <Billboard position={[0, 0.15, 0]}>
          <Text
            fontSize={0.05}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.005}
            outlineColor="#000000"
          >
            {formatCountryName(country.name) === 'USA' ? '' : formatCountryName(country.name)}
          </Text>
        </Billboard>
      </group>
    </group>
  );
});

CountryMarker.displayName = 'CountryMarker';
