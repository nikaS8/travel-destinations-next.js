export interface CityData {
  address: {
    countryCode: string;
    stateCode: string;
  };
  geoCode: {
    latitude: number;
    longitude: number;
  };
  iataCode: string;
  name: string;
  subType: string;
  type: string;
}

export interface RequestBody {
  city: string;
}

export interface ApiResponse {
  cityResponse?: {
      result: {
          data: CityData[]
      },
  };
  error?: string;
}

export interface SuccessResponse {
  data: CityData[];
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

export interface CityShoppingActivity {
  description: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  id: string;
  minimumDuration: string;
  name: string;
  pictures: string[];
  type: string;
}
