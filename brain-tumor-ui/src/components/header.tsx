
export const Header = () => {
  return (
    <div className="pb-8 max-w-4xl text-center">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight pb-4 text-gray-200">
              NeuroScan AI: Brain Tumor Detection System
            </h1>

            <p className="text-sm md:text-base text-neutral-300">
              NeuroScan AI is a deep learning–based system that detects brain tumors from MRI scans using a trained YOLO model. It provides real-time predictions with highlighted tumor regions for fast and accurate medical assistance.
            </p>
          </div>
  );
}