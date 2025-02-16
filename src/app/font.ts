import { Knewave, Noto_Sans_JP } from 'next/font/google';

export const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
});

export const knewave = Knewave({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});
