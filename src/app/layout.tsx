import type { Metadata } from 'next';
import { knewave, notoSansJp } from './font';
import './globals.css';

export const metadata: Metadata = {
  title: 'Personal Color',
  description: 'パーソナルカラー診断で、自分に似合った色を見つけよう！',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJp.className} ${knewave.className}`}>
      <body>{children}</body>
    </html>
  );
}
