export type Run = {
  complete: boolean;
  flow: number;
  id: number;
  production_date: string;
};

export type Trend = {
  horizon: number;
  horizon_date: string;
  horizon_frequency: string;
  horizon_name: string;
  id: number;
  output: number;
  output_type: string;
  trend: number;
};
