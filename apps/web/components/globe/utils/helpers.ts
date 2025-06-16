import * as THREE from 'three';

// Convert lat/lng to 3D coordinates
export function latLngToVector3(lat: number, lng: number, radius: number = 5): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Format country name for display
export function formatCountryName(name: string): string {
  if (name === 'United States of America' || name === 'United States' || name === 'USA') {
    return 'USA';
  }
  return name;
}

// Format population number
export function formatPopulation(population: number): string {
  return (population / 1000000).toFixed(1) + 'M';
}
