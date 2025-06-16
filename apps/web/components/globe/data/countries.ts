import { CountryData, GeoJSONData } from '../types';

// Function to load real country data from GeoJSON
export async function loadRealCountriesFromGeoJSON(): Promise<CountryData[]> {
  try {
    const response = await fetch('/data/all.geojson');
    if (!response.ok) {
      throw new Error(`Failed to fetch GeoJSON: ${response.status}`);
    }

    const geoData: GeoJSONData = await response.json();
    const countries: CountryData[] = [];

    geoData.features.forEach((feature) => {
      const coordinates: number[][] = [];

      // Extract coordinates from different geometry types
      if (feature.geometry.type === 'Polygon') {
        const coords = feature.geometry.coordinates[0] as number[][];
        coordinates.push(...coords);
      } else if (feature.geometry.type === 'MultiPolygon') {
        const multiCoords = feature.geometry.coordinates as number[][][][];
        multiCoords.forEach((polygon) => {
          const coords = polygon[0] as number[][];
          coordinates.push(...coords);
        });
      }

      // Only keep countries with population > 10M
      const population = feature.properties.POP_EST || 0;
      if (population < 10000000) {
        return;
      }

      countries.push({
        name: feature.properties.NAME,
        coordinates,
        population: feature.properties.POP_EST || 0,
        continent: feature.properties.CONTINENT || 'Unknown',
        color: getContinentColor(feature.properties.CONTINENT || 'Unknown')
      });
    });

    return countries;
  } catch (error) {
    console.error('Error loading countries from GeoJSON:', error);
    return [];
  }
}

// Assign continent-based colors
function getContinentColor(continent: string): string {
  switch (continent) {
    case 'North America': return '#3b82f6'; // Blue
    case 'South America': return '#10b981'; // Green
    case 'Europe': return '#8b5cf6'; // Purple
    case 'Asia': return '#f59e0b'; // Orange
    case 'Africa': return '#ef4444'; // Red
    case 'Oceania': return '#06b6d4'; // Cyan
    case 'Antarctica': return '#6b7280'; // Gray
    default: return '#9ca3af'; // Gray default
  }
}
