'use client';

import clsx from 'clsx';

type Props = {
  message: string;
  isShow: boolean;
};

const Toast = ({ message, isShow }: Props) => {
  return (
    <div
      className={clsx(
        'rounded-xl bg-black px-28 py-3 text-2xl text-white opacity-80',
        `${isShow ? 'block' : 'hidden'}`,
      )}
    >
      {message}
    </div>
  );
};

export default Toast;
