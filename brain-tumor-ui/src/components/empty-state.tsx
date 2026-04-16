export const EmptyState = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-neutral-400 text-sm gap-2">
      <p>No scan uploaded</p>
      <p className="text-xs text-neutral-500">Upload an MRI scan to begin analysis</p>
    </div>
  );
};