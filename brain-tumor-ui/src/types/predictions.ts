export type Prediction = {
  class: string;
  confidence: number;
};

export type PredictionResponse = {
  filename: string;
  predictions: Prediction[];
  output_image_url: string | null;
};