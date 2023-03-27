export type RequestStatus = 'idle' | 'pending' | 'rejected' | 'resolved';

export interface QueryState<IData> {
  status: RequestStatus;
  data: IData;
  error: null;
}

export interface QueryListResult<TResult> {
  count: number;
  data: TResult[];
}

export interface IUniversity {
  uni_code: string;
  suburb_postcode: string | number;
  uni_lat: string | number;
  uni_long: string | number;
  suburb_name: string;
  uni_name: string;
}

export interface ISuburb {
  crime_count: number;
  distance_in_km: number;
  suburb_postcode: number;
  suburb_name: string;
  suburb_state: string;
  suburb_lat: number;
  suburb_long: number;
  rent_price: number;
  rent_date: string;
  rent_score: number;
  crime_year: number;
  crime_score_original: number;
  crime_score: number;
  distance_score: number;
  scaled_rent_score: number;
  scaled_crime_score: number;
  scaled_distance_score: number;
  scaled_overall_score: number;
  train_count: number;
  tram_count: number;
  bus_count: number;
}

export type WeightageValues = 0 | 1 | 2 | 3 | 4;

export interface IFactorWeightages {
  rent: WeightageValues;
  crime_rate: WeightageValues;
  distance: WeightageValues;
}

export type Factor = keyof IFactorWeightages;
