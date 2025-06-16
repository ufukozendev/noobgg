'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { CountryData } from '../types';

interface RealCountriesProps {
  orbitControlsRef: React.RefObject<OrbitControlsImpl | null>;
  countries: CountryData[];
}

export const RealCountries = React.memo(({ orbitControlsRef, countries }: RealCountriesProps) => {
  const groupRef = useRef<THREE.Group>(null);

  // Apply rotation to match the globe view from OrbitControls
  useFrame(() => {
    if (groupRef.current && orbitControlsRef.current) {
      groupRef.current.rotation.y = -orbitControlsRef.current.getAzimuthalAngle();
    }
  });

  // Convert GeoJSON coordinates to 3D points on sphere with 2x density
  const countryPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const colors: THREE.Color[] = [];

    countries.forEach((country) => {
      const color = new THREE.Color(country.color);

      // Sample coordinates for better performance - doubled density
      country.coordinates.forEach((coord, index) => {
        if (coord.length >= 2) {
          const [lng, lat] = coord;
          if (!isNaN(lat) && !isNaN(lng)) {
            // Convert lat/lng to 3D sphere coordinates
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lng + 180) * (Math.PI / 180);

            const point = new THREE.Vector3(
              -(5.05 * Math.sin(phi) * Math.cos(theta)),
              5.05 * Math.cos(phi),
              5.05 * Math.sin(phi) * Math.sin(theta)
            );

            points.push(point);
            colors.push(color);
            
            // Add multiple interpolated points between coordinates for 4x density
            if (index > 0) {
              const prevCoord = country.coordinates[index - 1];
              if (prevCoord && prevCoord.length >= 2) {
                const [prevLng, prevLat] = prevCoord;
                if (!isNaN(prevLat) && !isNaN(prevLng)) {
                  // Add 3 interpolated points between each coordinate pair
                  for (let i = 1; i <= 3; i++) {
                    const ratio = i / 4; // 0.25, 0.5, 0.75
                    const interpLat = prevLat + (lat - prevLat) * ratio;
                    const interpLng = prevLng + (lng - prevLng) * ratio;

                    const interpPhi = (90 - interpLat) * (Math.PI / 180);
                    const interpTheta = (interpLng + 180) * (Math.PI / 180);

                    const interpPoint = new THREE.Vector3(
                      -(5.05 * Math.sin(interpPhi) * Math.cos(interpTheta)),
                      5.05 * Math.cos(interpPhi),
                      5.05 * Math.sin(interpPhi) * Math.sin(interpTheta)
                    );

                    points.push(interpPoint);
                    colors.push(color);
                  }
                }
              }
            }
          }
        }
      });
    });

    return { points, colors };
  }, [countries]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(countryPoints.points.length * 3);
    const colorArray = new Float32Array(countryPoints.points.length * 3);

    countryPoints.points.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;

      const color = countryPoints.colors[i];
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    });

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    return geom;
  }, [countryPoints]);

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          size={0.025}
          vertexColors={true}
          transparent={true}
          opacity={0.9}
          sizeAttenuation={false}
        />
      </points>
    </group>
  );
});

RealCountries.displayName = 'RealCountries';
