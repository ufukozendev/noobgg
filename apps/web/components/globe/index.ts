// Export all components
export { EarthGlobe } from './components/EarthGlobe';
export { RealCountries } from './components/RealCountries';
export { CityHubs } from './components/CityHubs';
export { LaserConnections } from './components/LaserConnections';
export { CountryMarker } from './components/CountryMarker';
export { Atmosphere } from './components/Atmosphere';
export { Starfield } from './components/Starfield';
export { Scene } from './components/Scene';
export { NetworkStatsPanel } from './components/NetworkStatsPanel';
export { WebGLErrorBoundary } from './components/WebGLErrorBoundary';

// Export UI components
export { StatsOverlay } from './ui/StatsOverlay';
export { CountryInfoPanel } from './ui/CountryInfoPanel';
export { CountryModal } from './ui/CountryModal';
export { CityModal } from './ui/CityModal';
export { ControlsOverlay } from './ui/ControlsOverlay';
export { StatusIndicator } from './ui/StatusIndicator';
export { LoadingOverlay } from './ui/LoadingOverlay';

// Export data
export { MAJOR_CITIES } from './data/cities';
export { loadRealCountriesFromGeoJSON } from './data/countries';

// Export utils
export { latLngToVector3, formatCountryName, formatPopulation } from './utils/helpers';

// Export types
export type {
  GeoJSONFeature,
  GeoJSONData,
  CountryData,
  CityData,
  SceneProps
} from './types';
