import { useState } from 'react';

import { UploadPanel } from './upload';
import { ResultPanel } from './result';
import { EmptyState } from './empty-state';
import { PredictionResponse } from '../../types/predictions';

export const MainPanels = () => {

  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [scanning, setScanning] = useState(false);

  return (
    <div className="w-full max-w-5xl flex lg:flex-row flex-col  justify-center gap-6 mb-6">
    
      {/* Upload Card */}
      <div className="bg-white/5 w-full backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl py-6 pl-6 pr-2 overflow-hidden max-h-[70vh]">
        <UploadPanel setResult={setResult} setScanning={setScanning} />
      </div>

      {/* Result Card */}
      <div className="bg-white/5 w-full backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl py-6 pl-6 pr-2 max-h-[70vh] overflow-hidden ">
        {scanning || result ? (
          <ResultPanel result={result} scanning={scanning} /> 
        ) : (
          <EmptyState />
        )}
      </div>

    </div>
  );
}