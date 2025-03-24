'use client';

import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  isShow: boolean;
};

const Toast = ({ children, isShow }: Props) => {
  return (
    <div
      className={clsx(
        'rounded-xl bg-black px-28 py-3 text-2xl text-white opacity-80',
        `${isShow ? 'block' : 'hidden'}`,
      )}
    >
      {children}
    </div>
  );
};

export default Toast;
