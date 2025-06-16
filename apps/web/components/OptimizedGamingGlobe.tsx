'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useIsMobile } from '../hooks/use-mobile';
import {
  Scene,
  WebGLErrorBoundary,
  StatsOverlay,
  CountryInfoPanel,
  CountryModal,
  CityModal,
  ControlsOverlay,
  StatusIndicator,
  LoadingOverlay,
  loadRealCountriesFromGeoJSON,
  MAJOR_CITIES,
  CountryData,
  CityData,
  LaserConnections
} from './globe';

interface OptimizedGamingGlobeProps {
  showCountries?: boolean;
}

export default function OptimizedGamingGlobe({ showCountries = true }: OptimizedGamingGlobeProps) {  // State management
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [webglError, setWebglError] = useState(false);
  const [isContextLost, setIsContextLost] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [totalPlayers, setTotalPlayers] = useState(65000);  // Network stats
  const [activeHubs, setActiveHubs] = useState(34);
  const [connectionStatus, setConnectionStatus] = useState<'Live' | 'Connecting' | 'Offline'>('Live');

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMouseOverRef = useRef(false);
  const isMobile = useIsMobile();
  // Dynamic player count and hub count animation
  useEffect(() => {
    const updateCounts = () => {
      const time = Date.now() / 1000;
      
      // Player count
      const baseWave = Math.sin(time * 0.05) * 0.3;
      const fastWave = Math.sin(time * 0.3) * 0.1;
      const randomWave = Math.sin(time * 0.15 + Math.sin(time * 0.08) * 2) * 0.15;
      const totalVariation = baseWave + fastWave + randomWave;
      const baseCount = 65000;
      const range = 25000;
      const newCount = Math.round(baseCount + (totalVariation * range));
      const clampedCount = Math.max(40000, Math.min(90000, newCount));
      setTotalPlayers(clampedCount);
      
      // Active hubs count (slower variation)
      const hubWave = Math.sin(time * 0.03) * 0.2;
      const hubBaseCount = 34;
      const hubRange = 8;
      const newHubCount = Math.round(hubBaseCount + (hubWave * hubRange));
      const clampedHubCount = Math.max(25, Math.min(45, newHubCount));
      setActiveHubs(clampedHubCount);
    };

    const interval = setInterval(updateCounts, 2000);
    return () => clearInterval(interval);
  }, []);

  // Load countries data
  useEffect(() => {
    let isMounted = true;

    const loadCountries = async () => {
      try {
        const countryData = await loadRealCountriesFromGeoJSON();
        if (isMounted) {
          setCountries(countryData);
          setIsLoadingCountries(false);
        }
      } catch (error) {
        console.error('Failed to load countries:', error);
        if (isMounted) {
          setIsLoadingCountries(false);
        }
      }
    };

    loadCountries();
    return () => { isMounted = false; };
  }, []);

  // Event handlers
  const handleCountryHover = useCallback((country: CountryData | null) => {
    setHoveredCountry(country);
  }, []);

  const handleCityClick = useCallback((city: CityData) => {
    setSelectedCity(city);
  }, []);

  const handleWebGLError = useCallback(() => {
    setWebglError(true);
    setTimeout(() => {
      setWebglError(false);
      setIsContextLost(false);
    }, 2000);
  }, []);

  // WebGL Context Loss/Restore Handler
  useEffect(() => {
    const handleContextLost = (event: Event) => {
      console.warn('WebGL context lost, preventing default and remounting...');
      event.preventDefault();
      setIsContextLost(true);

      setTimeout(() => {
        setCanvasKey(prev => prev + 1);
        setIsContextLost(false);
        setWebglError(false);
      }, 1500);
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
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
  }, [canvasKey]);  // Memoized props and settings
  const sceneProps = useMemo(() => ({
    onCountryHover: handleCountryHover,
    isMobile: isMobile,
    selectedCountry: selectedCountry,
    setSelectedCountry: setSelectedCountry,
    showCountries: showCountries,
    countries: countries,
    isLoadingCountries: isLoadingCountries,
    onCityClick: handleCityClick,
    selectedCity: selectedCity,
    isMouseOverRef: isMouseOverRef,
  }), [
    handleCountryHover, 
    handleCityClick, 
    isMobile, 
    selectedCountry, 
    selectedCity, 
    showCountries, 
    countries, 
    isLoadingCountries
  ]);

  const cameraSettings = useMemo(() => ({
    position: [0, 0, isMobile ? 24 : 15] as [number, number, number],
    fov: 50
  }), [isMobile]);

  const glSettings = useMemo(() => ({
    antialias: false,
    alpha: true,
    powerPreference: "default" as const,
    preserveDrawingBuffer: true,
    failIfMajorPerformanceCaveat: false,
    stencil: false,
    depth: true,
    premultipliedAlpha: true
  }), []);

  // Cleanup
  useEffect(() => {
    return () => {
      try {
        if (canvasRef.current) {
          const gl = canvasRef.current.getContext('webgl2') || canvasRef.current.getContext('webgl');
          if (gl && !gl.isContextLost()) {
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

  return (
    <WebGLErrorBoundary>
      <div
        className="relative w-full h-[800px] bg-transparent"
        onMouseEnter={() => (isMouseOverRef.current = true)}
        onMouseLeave={() => (isMouseOverRef.current = false)}
      >
        {/* Loading Overlays */}
        <LoadingOverlay
          isLoading={isLoadingCountries}
          message="🌍 Loading Countries..."
          description="Loading world countries from GeoJSON"
        />

        <LoadingOverlay
          isLoading={isContextLost}
          message="⚠️ Context Restoring..."
          description="WebGL context is being restored"
        />

        {/* Main Canvas */}
        {!webglError && !isContextLost ? (
          <Canvas
            ref={canvasRef}
            key={canvasKey}
            camera={cameraSettings}
            gl={glSettings}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            frameloop="always"
            onError={handleWebGLError}
          >
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
        )}        {/* UI Overlays */}
        <StatsOverlay 
          isMobile={isMobile} 
          totalPlayers={totalPlayers}
          activeHubs={activeHubs}
          connectionStatus={connectionStatus}
        />

        {/* Country Info Panel */}
        {hoveredCountry && !selectedCountry && (
          <CountryInfoPanel country={hoveredCountry} />
        )}

        {/* Modals */}
        {selectedCountry && (
          <CountryModal
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
          />
        )}

        {selectedCity && (
          <CityModal
            city={selectedCity}
            onClose={() => setSelectedCity(null)}
          />
        )}        {/* Controls and Status */}
        <ControlsOverlay isMobile={isMobile} />
        <StatusIndicator
          isMobile={isMobile}
          isContextLost={isContextLost}
          webglError={webglError}
        />
      </div>
    </WebGLErrorBoundary>
  );
}
