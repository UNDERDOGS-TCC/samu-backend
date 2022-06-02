export interface SamuLocationBody {
  latitude: number;
  longitude: number;
  radius?: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapsApiResponse {
  data: MapsNearbyApiResponse;
}

export interface MapsNearbyApiResponse {
  results: CandidatesBody[];
  status: string;
}

export interface CandidatesBody {
  formatted_address: string;
  geometry: GeometryBody;
  name: string;
}

export interface GeometryBody {
  location: LatLng;
  viewport: {
    northeast: LatLng;
    southwest: LatLng;
  };
}
