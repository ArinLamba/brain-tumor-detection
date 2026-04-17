import { useState } from "react";

import { Report } from "@/components/report";
import { DownloadReport } from "@/components/download";
import { ScanLoading } from "@/components/scan-loading";
import { PredictionResponse } from "@/types/predictions";
import { AnalysisReportTab } from "@/components/analysis-report-tab";


type ResultPanelProps = {
  result: PredictionResponse | null;
  scanning: boolean;
};

export const ResultPanel = ({ result, scanning }: ResultPanelProps) => {
  const [tab, setTab] = useState<"result" | "analysis">("result");

  if (scanning) {
    return (
      <ScanLoading />
    );
  }

  if (!result) return null;

return (
  <div className="space-y-4 h-full overflow-y-auto pr-4 scroll-smooth">

    {/* Header */}
    <div className="flex justify-between">
      <h2 className="text-lg font-semibold">Prediction Result</h2>
      <DownloadReport result={result} />
    </div>

    {/* Tabs */}
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setTab("result")}
        className={`px-3 py-1 rounded-lg text-sm border ${
          tab === "result"
            ? "bg-white text-black"
            : "bg-transparent border-white/20 text-white"
        }`}
      >
        Result
      </button>

      <button
        onClick={() => setTab("analysis")}
        className={`px-3 py-1 rounded-lg text-sm border ${
          tab === "analysis"
            ? "bg-white text-black"
            : "bg-transparent border-white/20 text-white"
        }`}
      >
        Analysis
      </button>
    </div>

    {/* CONTENT SWITCH */}
    {tab === "result" ? (
      <>
        {/* RESULT TAB */}
        <div className="text-sm text-gray-100 w-full">

          {result.predictions.map((pred, i) => {
            const confidence = pred.confidence * 100;

            return (
              <div key={i} className="py-3 border-b border-gray-700">

                <div className="flex justify-between mb-1">
                  <span className="font-medium">
                    {pred.class.toUpperCase()}
                  </span>

                  <span className="text-gray-300">
                    Confidence: {confidence.toFixed(1)}%
                  </span>
                </div>

                <div className="w-full h-0.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      confidence > 70
                        ? "bg-green-500"
                        : confidence > 40
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${confidence}%` }}
                  />
                </div>

              </div>
            );
          })}
        </div>

        {/* IMAGE */}
        {result.output_image_url && (
          <div className="pt-6">
            <img
              src={result.output_image_url}
              className="w-full rounded-lg border border-white/20"
            />
          </div>
        )}
      </>
    ) : (
      <>
        {/* ANALYSIS TAB */}
        <AnalysisReportTab result={result} />
      </>
    )}

    {result && (
      <div
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
        }}
      >
        <Report result={result} />
      </div>
    )}

  </div>
);
};