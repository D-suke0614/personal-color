'use client';

import TextButton from '@/components/TextButton/TextButton';
import TitleLabel from '@/components/TitleLabel/TitleLabel';
import { snsImagePaths } from '@/constants/snsImagePaths';
import Image from 'next/image';
import Link from 'next/link';

type Image = {
  src: string;
  alt: string;
};

type Props = {
  result: 'spring' | 'summer' | 'autumn' | 'winter';
  shareImage: Image;
};

// todo: シェアリンクのgoogle.com部分を結果ページのリンクに置き換える
const SNS_ITEM_LIST = [
  {
    key: 'line',
    // https://social-plugins.line.me/lineit/share?url=google.com$text=任意のテキストを埋め込める
    shareLink: `https://social-plugins.line.me/lineit/share?url=google.com`,
    ...snsImagePaths.line,
  },
  {
    key: 'insta',
    shareLink: ``,
    ...snsImagePaths.insta,
  },
  {
    key: 'x',
    // https://twitter.com/intent/tweet?url=google.com&text=ポストさせたい任意のテキストを埋め込める
    shareLink: `https://twitter.com/intent/tweet?url=google.com`,
    ...snsImagePaths.x,
  },
  {
    key: 'facebook',
    shareLink: `https://www.facebook.com/share.php?u=google.com`,
    ...snsImagePaths.facebook,
  },
];

const ResultTemplate = ({ result, shareImage }: Props) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    // todo: トースト実装後差し替え
    window.alert('copied!');
  };

  return (
    <div className="w-screen pb-32">
      {/* ① */}
      {/* ② */}
      {/* ③ */}
      {/* ④ */}
      {/* ⑤ */}
      {/* ⑥ */}
      <section>
        <div className="mt-36 px-48 text-left">
          <TitleLabel background={result}>SNSでシェア</TitleLabel>
        </div>
        <Image
          className="mt-16 px-44"
          src={shareImage.src}
          alt={shareImage.alt}
          width={1450}
          height={1030}
        />
        <div className="mx-auto mt-16 flex w-3/5 justify-around">
          {SNS_ITEM_LIST.map(({ key, src, alt, shareLink }) =>
            // インスタだけ共有用URLの作り方がわからなかったので、一旦画像だけ配置
            // todo: 共有用URLが作成できれば修正、無理ならインスタは削除
            key === 'insta' ? (
              <div key={key}>
                <Image src={src} alt={alt} width={100} height={100} />
              </div>
            ) : (
              <Link key={key} href={shareLink} target="_blank" className="block">
                <Image src={src} alt={alt} width={100} height={100} />
              </Link>
            ),
          )}
        </div>
        <p className="mt-16 px-56 text-center font-sans">
          このボタンからリンクをコピーしてSNSに投稿すると、このように診断結果画像が表示されます。
          <br />
          SNSで友達やフォロワーに診断結果をシェアしてみよう！
        </p>
        <div className="mt-16 text-center">
          <TextButton onClick={copyToClipboard}>診断結果リンクをコピーする</TextButton>
        </div>
      </section>
    </div>
  );
};

export default ResultTemplate;
