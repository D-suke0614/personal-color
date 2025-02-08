'use client';

import { useEffect, useState } from 'react';

type ProgressBarProps = {
  initialProgress: progressPercentage;
};

// 仮で10ずつの数値を設定
type progressPercentage = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

const ProgressBar: React.FC<ProgressBarProps> = ({ initialProgress }) => {
  const [progress, setProgress] = useState<progressPercentage>(initialProgress);

  useEffect(() => {
    setProgress(initialProgress);
  }, [initialProgress]);

  return (
    <div className="relative my-4 size-full">
      <div className="h-11 overflow-hidden rounded-full bg-[#b4b3b3] shadow-[3px_3px_3px_#c0c0c0]">
        <div
          className="h-full w-fit rounded-full bg-gradient-to-r from-[#E3FDFB] via-[#FFCEDE] to-[#DCBCF6] transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="absolute top-0 h-11 w-full text-center font-bold leading-[2.75rem]">
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
