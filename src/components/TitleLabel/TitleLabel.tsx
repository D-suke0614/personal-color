'use client';

import Title from '@/components/Title/Title';
import { COLOR_CODES } from '@/constants/colorCodes';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  background: 'spring' | 'summer' | 'autumn' | 'winter';
};

const TitleLabel = ({ children, background }: Props) => {
  return (
    <>
      <div
        className={clsx(
          'relative w-[416px] rounded-md border-2 border-solid border-black bg-white px-4 py-5 text-center text-3xl font-bold after:absolute after:left-3 after:top-4 after:-z-10 after:size-full after:rounded-md after:border-2 after:border-solid after:border-black',
          `after:bg-[${COLOR_CODES[background]}]`,
        )}
      >
        <Title as="h2">{children}</Title>
      </div>
    </>
  );
};

export default TitleLabel;
