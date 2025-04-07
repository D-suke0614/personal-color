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
        'w-[80vw] rounded-xl bg-black py-3 text-center text-[20px] text-white opacity-80 md:w-[50vw]',
        `${isShow ? 'block' : 'hidden'}`,
      )}
    >
      {children}
    </div>
  );
};

export default Toast;
