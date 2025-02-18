'use client';

import Pagination from '@/components/Pagination/Pagination';
import { useCallback, useState } from 'react';

type pageValue = 1 | 2 | 3 | 4 | 5 | 6;

export default function Home() {
  const [currentPage, setCurrentPage] = useState<pageValue>(1);

  const handlePageChange = (page: pageValue) => {
    setCurrentPage(page);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      if (currentPage === 6) {
        // TODO: /diagnoseページができた後にコメントインする
        // router.push('/diagnose');
      } else {
        setCurrentPage((prev) => (prev < 6 ? ((prev + 1) as pageValue) : prev));
      }
    } else if (event.key === 'ArrowLeft') {
      setCurrentPage((prev) => (prev > 1 ? ((prev - 1) as pageValue) : prev));
    }
  }, []);

  return (
    <div>
      <h1>Personal Color</h1>
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}
