import { PredictionResponse } from "../../types/predictions";

export const Report = ({ result }: { result: PredictionResponse }) => {

  return (
    <div
      id="report"
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: "32px",
        fontFamily: "Arial, sans-serif",
        width: "800px",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>
          NeuroScan AI
        </h1>
        <p style={{ fontSize: "14px", color: "#555" }}>
          Brain Tumor Detection Report
        </p>
      </div>

      <hr />

      {/* META INFO */}
      <div style={{ marginTop: "16px", marginBottom: "16px", fontSize: "13px" }}>
        <p><b>File Name:</b> {result.filename.split("\\").pop()}</p>
        <p><b>Date:</b> {new Date().toLocaleString()}</p>
      </div>

      <hr />

      {/* DIAGNOSIS */}
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
          Diagnosis
        </h2>

        {(() => {
          const sorted = [...result.predictions].sort(
            (a, b) => b.confidence - a.confidence
          );

          const primary = sorted[0];
          const others = sorted.slice(1);
          return (
            <>
              {/* PRIMARY */}
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Primary Diagnosis
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    marginTop: "4px",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>
                    {primary?.class || "None"}
                  </span>

                  <span>
                    {((primary?.confidence || 0) * 100).toFixed(1)}%
                  </span>
                </div>

                {/* 🔥 PREMIUM BAR */}
                <div
                  style={{
                    height: "8px",
                    background: "#e5e5e5",
                    borderRadius: "999px",
                    marginTop: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(primary?.confidence || 0) * 100}%`,
                      height: "100%",
                      borderRadius: "999px",
                      background:
                        (primary?.confidence || 0) > 0.8
                          ? "linear-gradient(90deg, #ef4444, #dc2626)" // red
                          : (primary?.confidence || 0) > 0.5
                          ? "linear-gradient(90deg, #f59e0b, #d97706)" // orange
                          : "linear-gradient(90deg, #22c55e, #16a34a)", // green
                    }}
                  />
                </div>
              </div>

              {/* DIVIDER */}
              {others.length > 0 && (
                <hr style={{ margin: "14px 0", borderColor: "#ddd" }} />
              )}

              {/* OTHER FINDINGS */}
              {others.length > 0 && (
                <div>
                  <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                    Other Possible Findings
                  </p>

                  {others.map((p, i) => {
                    const conf = p.confidence;

                    return (
                      <div key={i} style={{ marginTop: "10px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "13px",
                          }}
                        >
                          <span>{p.class}</span>
                          <span>{(conf * 100).toFixed(1)}%</span>
                        </div>

                        {/* 🔥 BAR */}
                        <div
                          style={{
                            height: "6px",
                            background: "#e5e5e5",
                            borderRadius: "999px",
                            marginTop: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${conf * 100}%`,
                              height: "100%",
                              borderRadius: "999px",
                              background:
                                conf > 0.8
                                  ? "linear-gradient(90deg, #ef4444, #dc2626)"
                                  : conf > 0.5
                                  ? "linear-gradient(90deg, #f59e0b, #d97706)"
                                  : "linear-gradient(90deg, #22c55e, #16a34a)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* IMAGE */}
      {result.output_image_url && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={result.output_image_url}
            crossOrigin="anonymous"
            style={{
              width: "100%",
              maxHeight: "450px",
              objectFit: "contain",
              border: "1px solid #ccc",
              padding: "4px",
            }}
          />
          <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            MRI scan with detected tumor region
          </p>
        </div>
      )}

      {/* AI INFO */}
      <div style={{ marginTop: "20px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>
          AI Analysis
        </h2>

        <p style={{ fontSize: "13px", color: "#444", marginTop: "6px" }}>
          This result is generated using a deep learning model trained on MRI scan datasets
          to assist in detecting brain tumors.
        </p>

        <p style={{ fontSize: "13px", color: "#444", marginTop: "8px" }}>
          <b>Confidence</b> indicates how certain the AI model is about its prediction.
          It should not be considered a medical diagnosis.
        </p>
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: "30px", fontSize: "11px", color: "#777" }}>
        <hr style={{ marginBottom: "8px" }} />
        <p>
          ⚠ This report is generated by an AI system and is intended for informational purposes only.
          Please consult a qualified medical professional for diagnosis.
        </p>
      </div>
    </div>
  );
};