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
    <>
      <style>{`
        progress::-webkit-progress-value {
          background-image: linear-gradient(to right, #E3FDFB, #FFCEDE, #DCBCF6);
					border-radius: 1.375rem;
					transition: width 1s ease-in-out;
					min-width: 3rem;
        }
      `}</style>
      {/* TODO: pxからwidth: 100%に変更したい */}
      <div className="relative h-11 w-[304px] sm:w-[1196px]">
        <progress
          max="100"
          value={progress}
          className="h-11 w-full appearance-none rounded-full bg-[#b4b3b3] shadow-[3px_3px_3px_#c0c0c0] [&::-moz-progress-bar]:bg-transparent [&::-webkit-progress-bar]:bg-transparent"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center font-bold">
          {progress}%
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
