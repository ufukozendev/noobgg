'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { SceneProps } from '../types';
import { EarthGlobe } from './EarthGlobe';
import { RealCountries } from './RealCountries';
import { CityHubs } from './CityHubs';
import { LaserConnections } from './LaserConnections';
import { CountryMarker } from './CountryMarker';
import { Atmosphere } from './Atmosphere';
import { Starfield } from './Starfield';
import { MAJOR_CITIES } from '../data/cities';
import { useCityZoom } from '../hooks/useCityZoom';

export const Scene = React.memo(({
  onCountryHover,
  isMobile,
  selectedCountry,
  setSelectedCountry,
  showCountries = true,
  countries = [],
  onCityClick,
  selectedCity,
  isMouseOverRef,
  clickedCity,
  onZoomComplete,
  onZoomStart,
  highlightedCity
}: SceneProps) => {
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);
  // Use the city zoom hook
  useCityZoom({
    orbitControlsRef,
    clickedCity: clickedCity || null,
    onZoomComplete: onZoomComplete || (() => {}),
    onZoomStart: onZoomStart || (() => {})
  });

  // Auto-rotate control
  useFrame(() => {
    if (orbitControlsRef.current) {
      const controls = orbitControlsRef.current;
      const shouldAutoRotate = !isMouseOverRef.current && !selectedCountry && !selectedCity && !clickedCity;
      if (controls.autoRotate !== shouldAutoRotate) {
        controls.autoRotate = shouldAutoRotate;
      }
    }
  });

  return (
    <group>
      {/* Stars in background - behind the Earth */}
      <Starfield />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#4fc3f7" />

      <EarthGlobe />
      
      {/* Render real countries if enabled and data is available */}
      {showCountries && countries.length > 0 && (
        <RealCountries orbitControlsRef={orbitControlsRef} countries={countries} />
      )}      {/* Render city hubs */}
      <CityHubs 
        orbitControlsRef={orbitControlsRef} 
        onCityClick={onCityClick}
        highlightedCity={highlightedCity}
      />

      {/* Laser connections between cities */}
      <LaserConnections 
        cities={MAJOR_CITIES} 
        maxConnections={100} 
        orbitControlsRef={orbitControlsRef}
        animationSpeed={1.0}
        brightness={1.0}
        showAllConnections={true}
      />
      
      {/* Render country markers for interaction - reduced number */}
      {countries.length > 0 && countries.slice(0, 5).map((country, index) => (
        <CountryMarker
          key={`country-${index}`}
          country={country}
          onHover={selectedCountry ? () => { } : onCountryHover}
          orbitControlsRef={orbitControlsRef}
          onClick={() => {
            setSelectedCountry(country);
            if (typeof onCountryHover === 'function') onCountryHover(null);
          }}
        />
      ))}

      <Atmosphere />

      <OrbitControls
        ref={orbitControlsRef}
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        zoomSpeed={0.8}
        rotateSpeed={0.5}
        minDistance={isMobile ? 15 : 8}
        maxDistance={isMobile ? 40 : 30}
        autoRotateSpeed={0.5}
        makeDefault
      />
    </group>
  );
});

Scene.displayName = 'Scene';
