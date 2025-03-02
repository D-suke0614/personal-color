'use client';

// import { useRouter } from "next/navigation";
import { useEffect } from 'react';

type PaginationProps = {
  currentPage: pageValue;
  onPageChange: (page: pageValue) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
};

type pageValue = 1 | 2 | 3 | 4 | 5 | 6;

const Pagination = ({ currentPage, onPageChange, handleKeyDown }: PaginationProps) => {
  // TODO: /diagnoseページができた後にコメントインする
  // const router = useRouter();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex justify-center">
      <ul className="flex items-center justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="mx-1 flex list-none items-center">
            <button
              type="button"
              className={`inline-block h-[18px] w-[40px] cursor-pointer rounded-[10px] border-[3px] border-black ${currentPage === index + 1 ? 'bg-black' : ''}`}
              onClick={() => onPageChange((index + 1) as pageValue)}
            ></button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mx-1 flex h-[37px] w-[39px] items-center justify-center rounded-full bg-black text-white"
        onClick={() => {
          if (currentPage === 6) {
            // TODO: /diagnoseページができた後にコメントインする
            // router.push('/diagnose');
          } else if (currentPage < 6) {
            onPageChange((currentPage + 1) as pageValue);
          }
        }}
      >
        ＞
      </button>
    </div>
  );
};

export default Pagination;
