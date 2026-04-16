import { PredictionResponse } from "../types/predictions";

type Props = {
  result: PredictionResponse | null;
};

export const AnalysisReportTab = ({ result } : Props) => {
  if(!result) return;
  const confidence = result.predictions[0]?.confidence * 100;

  const risk =
    confidence > 70 ? "High Risk" :
    confidence > 40 ? "Medium Risk" :
    "Low Risk";

  return (
    <div className="space-y-4">
      

      {/* Summary */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
        <p className="text-sm text-gray-400">AI Summary</p>
        <h3 className="text-lg font-semibold text-white">
          {result.predictions[0]?.class.toUpperCase()} Detected
        </h3>
      </div>

      {/* Risk */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
        <p className="text-sm text-gray-400">Risk Level</p>
        <p className={`text-lg font-semibold ${
          risk === "High Risk"
            ? "text-red-400"
            : risk === "Medium Risk"
            ? "text-yellow-400"
            : "text-green-400"
        }`}>
          
          {risk}
        </p>
        <div className="w-full mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            risk === "High Risk"
              ? "bg-red-500"
              : risk === "Medium Risk"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{ width: risk === "High Risk" ? "90%" : risk === "Medium Risk" ? "60%" : "30%" }}
        />
      </div>
      </div>
      

      {/* Insight */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
        <p className="text-sm text-gray-400">Key Insight</p>
        <p className="text-white text-sm">
          Model detected abnormal tissue patterns consistent with tumor presence.
        </p>
      </div>

      {/* Model Info */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
        <p className="text-sm text-gray-400">Model</p>
        <p className="text-white text-sm">
          YOLOv8 • Real-time inference
        </p>
      </div>

    </div>
  );
};