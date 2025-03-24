import Link from 'next/link';
import type { UrlObject } from 'url';

type Url = string | UrlObject;

type Props = {
  children: React.ReactNode;
  href: Url;
  target: '_blank' | '_self' | '_top' | '_parent';
};

const TextLink = ({ children, href, target = '_blank' }: Props) => {
  return (
    <Link
      className="min-w-48 rounded-xl bg-primary px-8 py-3 text-center text-2xl font-bold text-black shadow-primary hover:opacity-80 disabled:opacity-50"
      href={href}
      target={target}
    >
      {children}
    </Link>
  );
};

export default TextLink;
