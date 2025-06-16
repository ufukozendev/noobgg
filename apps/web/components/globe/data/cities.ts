import { CityData } from '../types';

// Major cities data (capital cities and major population centers)
export const MAJOR_CITIES: CityData[] = [
  // Asia
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, population: 37400000, type: 'megacity' },
  { name: 'Delhi', country: 'India', lat: 28.7041, lng: 77.1025, population: 32900000, type: 'megacity' },
  { name: 'Shanghai', country: 'China', lat: 31.2304, lng: 121.4737, population: 28500000, type: 'megacity' },
  { name: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074, population: 21700000, type: 'capital' },
  { name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, population: 21700000, type: 'megacity' },
  { name: 'Manila', country: 'Philippines', lat: 14.5995, lng: 120.9842, population: 13400000, type: 'capital' },
  { name: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780, population: 9700000, type: 'capital' },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, population: 11000000, type: 'capital' },
  { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018, population: 10700000, type: 'capital' },
  { name: 'Tehran', country: 'Iran', lat: 35.6892, lng: 51.3890, population: 9500000, type: 'capital' },
  { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, population: 9500000, type: 'capital' },
  { name: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, population: 16100000, type: 'megacity' },

  // Europe
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, population: 15500000, type: 'megacity' },
  { name: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6176, population: 12500000, type: 'capital' },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, population: 9500000, type: 'capital' },
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, population: 11000000, type: 'capital' },
  { name: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, population: 3700000, type: 'capital' },
  { name: 'Madrid', country: 'Spain', lat: 40.4168, lng: -3.7038, population: 6700000, type: 'capital' },
  { name: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964, population: 4300000, type: 'capital' },

  // North America
  { name: 'New York', country: 'United States of America', lat: 40.7128, lng: -74.0060, population: 18800000, type: 'megacity' },
  { name: 'Los Angeles', country: 'United States of America', lat: 34.0522, lng: -118.2437, population: 12400000, type: 'major' },
  { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332, population: 21800000, type: 'capital' },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, population: 6200000, type: 'major' },
  { name: 'Chicago', country: 'United States of America', lat: 41.8781, lng: -87.6298, population: 9500000, type: 'major' },

  // South America
  { name: 'São Paulo', country: 'Brazil', lat: -23.5558, lng: -46.6396, population: 22400000, type: 'megacity' },
  { name: 'Buenos Aires', country: 'Argentina', lat: -34.6118, lng: -58.3960, population: 15200000, type: 'capital' },
  { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lng: -43.1729, population: 13300000, type: 'major' },
  { name: 'Lima', country: 'Peru', lat: -12.0464, lng: -77.0428, population: 11000000, type: 'capital' },
  { name: 'Bogotá', country: 'Colombia', lat: 4.7110, lng: -74.0721, population: 11000000, type: 'capital' },

  // Africa
  { name: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792, population: 15400000, type: 'megacity' },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, population: 21300000, type: 'capital' },
  { name: 'Kinshasa', country: 'Dem. Rep. Congo', lat: -4.4419, lng: 15.2663, population: 15600000, type: 'capital' },
  { name: 'Johannesburg', country: 'South Africa', lat: -26.2041, lng: 28.0473, population: 10000000, type: 'major' },

  // Oceania
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, population: 5400000, type: 'major' },
];
