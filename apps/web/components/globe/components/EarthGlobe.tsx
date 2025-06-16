'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Wireframe Earth Globe
export const EarthGlobe = React.memo(() => {
  return (
    <mesh>
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
