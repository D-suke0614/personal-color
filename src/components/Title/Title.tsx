'use client';

import clsx from 'clsx';

type TitleProps<T extends 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1'> = {
  as?: T;
  children: React.ReactNode;
  isFontKnewave?: boolean;
  isFontBold?: boolean;
};

const fontSizeMap: Record<string, string> = {
  h1: 'sm:text-[50px] text-[40px]',
  h2: 'text-2xl',
  h3: 'text-xl',
  h4: 'text-lg',
  h5: 'text-base',
  h6: 'text-sm',
};

const Title = <T extends 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>({
  as,
  children,
  isFontKnewave = false,
  isFontBold = false,
}: TitleProps<T>) => {
  const Tag = (as || 'h1') as keyof JSX.IntrinsicElements;

  const fontClass = isFontKnewave ? 'font-knewave' : 'font-sans';
  const weightClass = isFontBold ? 'font-bold' : '';

  return (
    <Tag
      className={clsx('text-center', `${fontClass} ${weightClass} ${fontSizeMap[Tag]}`)}
    >
      {children}
    </Tag>
  );
};

export default Title;
