

export const ScanLoading = () => {
  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">

        {/* Scan Line */}
        <div className="absolute inset-0">
          <div className="scan-line" />
        </div>

        <p className="text-neutral-300 lg:mt-0 mt-8 text-sm animate-pulse">
          Analyzing MRI...
        </p>
      </div>
  );
};