'use client';
import Pagination from '@/components/Pagination/Pagination';
import Title from '@/components/Title/Title';
import type { PageValue } from '@/types/pageValue';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  contents: {
    title: string;
    content: JSX.Element;
  }[];
};

const Tutorial = ({ contents }: Props) => {
  const CarouselLength = contents.length;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<PageValue>(1);

  const onPageChange = (value: PageValue) => {
    setCurrentPage(value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const keyCode = e.code;
    if (keyCode !== 'ArrowRight' && keyCode !== 'ArrowLeft') return;
    if (keyCode === 'ArrowRight') {
      if (currentPage < CarouselLength) {
        const newCurrentPage = (currentPage + 1) as PageValue;
        setCurrentPage(newCurrentPage);
      } else if (currentPage === CarouselLength) {
        router.push('/diagnose');
      }
    } else {
      if (currentPage === 1) return;
      const newCurrentPage = (currentPage - 1) as PageValue;
      setCurrentPage(newCurrentPage);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-between py-32">
      <Title as="h2" isFontBold={true}>
        {contents[currentPage - 1].title}
      </Title>
      {contents[currentPage - 1].content}
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Tutorial;
