"use client";

import { PredictionResponse } from "@/types/predictions";
import { ChartNoAxesColumn } from "lucide-react";
import { useState } from "react";

type UploadPanelProps = {
  setResult: (result: React.SetStateAction<PredictionResponse | null>) => void;
  setScanning: (scan: React.SetStateAction<boolean>) => void
};

export const UploadPanel = ({ 
  setResult, 
  setScanning 
}: UploadPanelProps) => {

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setResult(null);
    setScanning(true);
    setLoading(true);

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict/`, {
        method: "POST",
        body: formData,
      });
      
      if(!res.ok) throw new Error("Upload Failed");

      const data = await res.json();
      //small delay for animation
      setTimeout(() => {
        setScanning(false);
        setLoading(false);
        setResult(data);
      }, 2000);

    } catch (err) {
      console.error(err);
      setScanning(false);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 h-full overflow-y-auto pr-4 scroll-smooth">

      <div className="flex justify-between">
        <h2 className="text-lg font-semibold ">
          Upload MRI Scan
        </h2>
        {/* Button */}
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="px-4 pl-5 text-center bg-white/90 text-black border border-white/30 rounded-lg py-2 text-sm hover:bg-white transition"
        >
          <div className="flex justify-center gap-x-4">
            <p>{loading ? "Analyzing MRI..." : "Run Analysis"}</p>
            <ChartNoAxesColumn size={20}/>
          </div>
        </button>
      </div>

      {/* Dropzone */}
      <label className="block border-2 border-dashed border-white/30 hover:border-white/60 rounded-xl p-6 text-center cursor-pointer group transition-colors duration-300">
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setFile(f);
            setPreview(URL.createObjectURL(f));
          }}
        />

        <p className="text-sm text-gray-400 group-hover:scale-110 group-hover:text-white transition-transform duration-300">
          Click to upload or drag & drop
        </p>
      </label>

      {/* Preview */}
      {preview && (
        <img
          alt="image"
          src={preview}
          className="w-full  object-contain border rounded-lg border-white/20"
        />
      )}

      {/* Button */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className=" w-full bg-white/90 text-black border border-white/30 rounded-xl py-2 text-sm hover:bg-white transition"
      >
        <div className="flex justify-center gap-x-4">
            <p>{loading ? "Analyzing MRI..." : "Run Analysis"}</p>
            <ChartNoAxesColumn size={20}/>
        </div>
      </button>
    </div>
  );
};