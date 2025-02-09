'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import React from 'react';

type Size = 'large' | 'medium' | 'small';

type CustomImageProps = ImageProps & {
  size: Size;
};

const CustomImage: React.FC<CustomImageProps> = ({ size, ...props }) => {
  const isLarge = size === 'large'; // 幅が画面いっぱい
  const isMedium = size === 'medium';
  const isSmall = size === 'small'; // SNSアイコン

  const imageClasses = [
    'object-cover',
    isLarge && 'w-[100vw] h-auto',
    isMedium && 'w-[90vw] h-auto sm:w-auto sm:h-[400px]',
    isSmall && 'w-auto h-[90px] sm:h-[158px]',
  ].join(' ');

  return <Image {...props} className={imageClasses} />;
};

export default CustomImage;
