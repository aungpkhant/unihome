export interface IUniversity {
  uni_code: string;
  suburb_postcode: string;
  uni_lat: number;
  uni_long: number;
  suburb_name: string;
  uni_name: string;
}

export interface ISuburb {
  overall_score: number;
  rent_date: string;
  rent_price: number;
  suburb_name: string;
  rent_score: number;
  suburb_postcode: number;
  suburb_state: string;
  suburb_lat: number;
  suburb_long: number;
  train_count: number;
  tram_count: number;
  bus_count: number;
}

export interface ISuburbUni {
  suburb_name: string;
  suburb_postcode: number;
  suburb_lat: number;
  suburb_long: number;
  uni_code: string;
  uni_lat: number;
  uni_long: number;
  distance_in_km: number;
}

export type WeightageValues = 0 | 1 | 2 | 3 | 4;

export interface IFactorWeightages {
  rent: WeightageValues;
  crime_rate: WeightageValues;
  distance: WeightageValues;
}

export type Factors = keyof IFactorWeightages;

export type IdealSuburbRequstQuery = {
  rent: number;
  crime_rate: number;
  distance: number;
  uni_code: string;
};
