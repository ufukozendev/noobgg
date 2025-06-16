'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Atmosphere = React.memo(() => {
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
        />
      </mesh>
    </>
  );
});

Atmosphere.displayName = 'Atmosphere';
