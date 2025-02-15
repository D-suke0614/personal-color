'use client';

type ProgressBarProps = {
  progressValue: progressValue;
};

// 仮で10ずつの数値を設定
type progressValue = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

const ProgressBar: React.FC<ProgressBarProps> = ({ progressValue }) => {
  return (
    <>
      <style>{`
        progress::-webkit-progress-value {
          background-image: linear-gradient(90deg, #E2FFFC 0%, #FFCEDE 50%, #DCBCF6 100%);
					border-radius: 1.375rem;
					transition: width 1s ease-in-out;
					min-width: 3rem;
        }
      `}</style>
      {/* TODO: pxからwidth: 100%に変更したい */}
      <div className="relative h-11 w-[304px] sm:w-[1196px]">
        <progress
          max="100"
          value={progressValue}
          className="h-11 w-full appearance-none rounded-full bg-[#b4b3b3] shadow-primary [&::-moz-progress-bar]:bg-transparent [&::-webkit-progress-bar]:bg-transparent"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center font-bold">
          {progressValue}%
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
