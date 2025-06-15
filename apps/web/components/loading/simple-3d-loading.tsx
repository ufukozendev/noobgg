"use client";

import React, { useRef, useMemo, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// GLTF Logo Component for Loading
function LoadingLogo() {
  const { scene } = useGLTF("/models/duck/logo.gltf");
  const logoRef = useRef<THREE.Group>(null);

  // Clone scene to avoid issues with multiple instances
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (clonedScene) {
      // Scale the model for loading screen
      clonedScene.scale.set(1.5, 1.5, 1.5);
      
      // Enhance materials
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Apply enhanced material if no texture exists
          if (!child.material.map) {
            child.material = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#9b87f5"),
              metalness: 0.3,
              roughness: 0.4,
              emissive: new THREE.Color("#4c1d95"),
              emissiveIntensity: 0.05,
            });
          }
        }
      });
    }
  }, [clonedScene]);

  return (
    <group ref={logoRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Simple rotating cube
function SimpleCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta;
      meshRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#9b87f5" 
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default function LoadingScreen3D() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background glows */}
      <div
        className="absolute right-0 top-0 h-1/2 w-1/2"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)",
        }}
      />
      <div
        className="absolute left-0 top-0 h-1/2 w-1/2 -scale-x-100"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)",
        }}
      />

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center space-x-3"
        >
          <div className="relative h-16 w-16">
            <Image
              src="/noobgg-logo.png"
              alt="noob.gg"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-white">noob.gg</h1>
            <p className="text-sm text-purple-300">Gaming Platform</p>
          </div>
        </motion.div>        {/* 3D GLTF Model */}
        <motion.div
          className="w-32 h-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Canvas 
            camera={{ position: [0, 0, 3] }}
            style={{ pointerEvents: 'auto', cursor: 'grab' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} />
            <pointLight position={[-5, -5, -5]} intensity={0.3} />
            <OrbitControls 
              enablePan={false} 
              enableZoom={false} 
              enableRotate={true}
              autoRotate={false}
              makeDefault
            />
            <Suspense fallback={<SimpleCube />}>
              <LoadingLogo />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <motion.p
            className="text-lg text-white font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading your gaming experience...
          </motion.p>
          <p className="text-sm text-purple-300 mt-2">
            Please wait while we prepare everything
          </p>
        </motion.div>

        {/* Simple progress dots */}
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-purple-400"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>    </motion.div>
  );
}

// Preload the GLTF model
useGLTF.preload("/models/duck/logo.gltf");
