import { useEffect, useRef, useCallback } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { CityData } from '../types';
import * as THREE from 'three';

interface UseCityZoomProps {
  orbitControlsRef: React.RefObject<OrbitControlsImpl | null>;
  clickedCity: CityData | null;
  onZoomComplete: () => void;
  onZoomStart?: () => void;
}

export const useCityZoom = ({
  orbitControlsRef, 
  clickedCity, 
  onZoomComplete,
  onZoomStart
}: UseCityZoomProps) => {
  const initialCameraState = useRef<{
    position: THREE.Vector3;
    target: THREE.Vector3;
  } | null>(null);
  
  const animationId = useRef<number | null>(null);
  const isZooming = useRef(false);

  // Store initial camera state
  useEffect(() => {
    if (orbitControlsRef.current && !initialCameraState.current) {
      const controls = orbitControlsRef.current;
      initialCameraState.current = {
        position: controls.object.position.clone(),
        target: controls.target.clone()
      };
    }
  }, [orbitControlsRef]);

  const stopAnimation = useCallback(() => {
    if (animationId.current) {
      cancelAnimationFrame(animationId.current);
      animationId.current = null;
    }
  }, []);

  const animateCamera = useCallback((
    startPos: THREE.Vector3,
    endPos: THREE.Vector3,
    startTarget: THREE.Vector3,
    endTarget: THREE.Vector3,
    duration: number = 1500,
    onComplete?: () => void
  ) => {
    if (!orbitControlsRef.current) return;

    const controls = orbitControlsRef.current;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      // Interpolate position and target
      const currentPos = startPos.clone().lerp(endPos, easeProgress);
      const currentTarget = startTarget.clone().lerp(endTarget, easeProgress);

      // Update camera and controls
      controls.object.position.copy(currentPos);
      controls.target.copy(currentTarget);
      controls.update();

      if (progress < 1) {
        animationId.current = requestAnimationFrame(animate);
      } else {
        animationId.current = null;
        isZooming.current = false;
        if (onComplete) onComplete();
      }
    };

    stopAnimation();
    isZooming.current = true;
    animationId.current = requestAnimationFrame(animate);
  }, [orbitControlsRef, stopAnimation]);  // Zoom to city when clickedCity changes
  useEffect(() => {
    if (!orbitControlsRef.current || !initialCameraState.current) return;

    if (clickedCity && !isZooming.current) {
      // Starting zoom to city
      if (onZoomStart) onZoomStart();

      const controls = orbitControlsRef.current;
      
      // Get the exact 3D position of the city (same calculation as CityHubs)
      const phi = (90 - clickedCity.lat) * (Math.PI / 180);
      const theta = (clickedCity.lng + 180) * (Math.PI / 180);
      const radius = 5.1; // Same as CityHubs
      
      const cityPosition = new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
      
      console.log(`🌍 ${clickedCity.name} (${clickedCity.lat}, ${clickedCity.lng}) → 3D: (${cityPosition.x.toFixed(2)}, ${cityPosition.y.toFixed(2)}, ${cityPosition.z.toFixed(2)})`);
      
      // SIMPLIFIED APPROACH: Use OrbitControls to smoothly set target and distance
      // This automatically handles all the complex positioning
      
      // Calculate optimal zoom distance
      const targetDistance = clickedCity.type === 'megacity' ? 9 : 
                           clickedCity.type === 'capital' ? 11 : 13;
      
      // Set new target and animate to it
      const currentPos = controls.object.position.clone();
      const currentTarget = controls.target.clone();
      
      // Calculate where camera should be: maintain current viewing direction but adjust distance
      const currentDirection = currentPos.clone().sub(cityPosition).normalize();
      const newCameraPos = cityPosition.clone().add(currentDirection.multiplyScalar(targetDistance));
      
      console.log(`📹 Camera: ${currentPos.x.toFixed(2)}, ${currentPos.y.toFixed(2)}, ${currentPos.z.toFixed(2)} → ${newCameraPos.x.toFixed(2)}, ${newCameraPos.y.toFixed(2)}, ${newCameraPos.z.toFixed(2)}`);
      console.log(`� Target: ${currentTarget.x.toFixed(2)}, ${currentTarget.y.toFixed(2)}, ${currentTarget.z.toFixed(2)} → ${cityPosition.x.toFixed(2)}, ${cityPosition.y.toFixed(2)}, ${cityPosition.z.toFixed(2)}`);

      animateCamera(
        currentPos,
        newCameraPos,
        currentTarget,
        cityPosition,
        1200,
        () => {
          console.log(`✅ Zoom completed for ${clickedCity.name}`);
          onZoomComplete();
        }
      );
    } else if (!clickedCity && isZooming.current === false && initialCameraState.current) {
      // Zoom out to initial position smoothly
      const controls = orbitControlsRef.current;
      
      animateCamera(
        controls.object.position.clone(),
        initialCameraState.current.position.clone(),
        controls.target.clone(),
        initialCameraState.current.target.clone(),
        1000
      );
    }
  }, [clickedCity, orbitControlsRef, onZoomComplete, onZoomStart, animateCamera]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, [stopAnimation]);
};
