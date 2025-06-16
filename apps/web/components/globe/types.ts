// Globe component types
export interface GeoJSONFeature {
  type: 'Feature';
  properties: {
    NAME: string;
    NAME_LONG: string;
    ISO_A3: string;
    CONTINENT: string;
    REGION_UN: string;
    POP_EST: number;
    [key: string]: any;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

export interface GeoJSONData {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export interface CountryData {
  name: string;
  coordinates: number[][];
  population: number;
  continent: string;
  color: string;
}

export interface CityData {
  name: string;
  country: string;
  lat: number;
  lng: number;
  population: number;
  type: 'capital' | 'major' | 'megacity';
}

export interface SceneProps {
  onCountryHover: (country: CountryData | null) => void;
  isMobile: boolean;
  selectedCountry: CountryData | null;
  setSelectedCountry: (country: CountryData | null) => void;
  showCountries?: boolean;
  countries?: CountryData[];
  isLoadingCountries?: boolean;
  onCityClick?: (city: CityData) => void;
  selectedCity?: CityData | null;
  isMouseOverRef: React.RefObject<boolean>;
}
