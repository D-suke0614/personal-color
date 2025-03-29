'use client';

import type { PageValue } from '@/types/pageValue';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type PaginationProps = {
  currentPage: PageValue;
  onPageChange: (page: PageValue) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
};

const Pagination = ({ currentPage, onPageChange, handleKeyDown }: PaginationProps) => {
  const router = useRouter();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const onClickNextButton = () => {
    if (currentPage === 5) {
      router.push('/diagnose');
    } else if (currentPage < 5) {
      onPageChange((currentPage + 1) as PageValue);
    }
  };

  return (
    <div className="flex justify-center">
      <ul className="flex items-center justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="mx-1 flex list-none items-center">
            <button
              type="button"
              className={`inline-block h-[18px] w-[40px] cursor-pointer rounded-[10px] border-[3px] border-black ${currentPage === index + 1 ? 'bg-black' : ''}`}
              onClick={() => onPageChange((index + 1) as PageValue)}
            ></button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mx-1 flex h-[37px] w-[39px] items-center justify-center rounded-full bg-black text-white"
        onClick={onClickNextButton}
      >
        ＞
      </button>
    </div>
  );
};

export default Pagination;
