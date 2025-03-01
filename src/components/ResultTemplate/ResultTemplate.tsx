'use client';

import TextButton from '@/components/TextButton/TextButton';
import TitleLabel from '@/components/TitleLabel/TitleLabel';
import { resultImagePaths } from '@/constants/resultImagePaths';
import { resultText } from '@/constants/resultText';
import { snsImagePaths } from '@/constants/snsImagePaths';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  result: 'spring' | 'summer' | 'autumn' | 'winter';
};

const RESULT_TEXT = {
  spring: 'イエベ春',
  summer: 'ブルベ夏',
  autumn: 'イエベ秋',
  winter: 'ブルベ冬',
} as const;

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
] as const;

const ResultTemplate = ({ result }: Props) => {
  const imagePaths = resultImagePaths[result];
  const resultTexts = resultText[result];

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
      <section className="mt-32">
        <div className="px-48 text-left">
          <TitleLabel
            background={result}
          >{`${RESULT_TEXT[result]}さんに似合わない色`}</TitleLabel>
        </div>
        <Image
          className="mx-auto mt-16 px-44"
          src={imagePaths.badFashion.src}
          alt={imagePaths.badFashion.alt}
          width={794}
          height={750}
        />
        <p className="mx-auto mt-16 w-1/2 whitespace-pre-line text-left font-sans">
          {resultTexts.badFashion}
        </p>
      </section>

      <section className="mt-32">
        <div className="px-48 text-left">
          <TitleLabel
            background={result}
          >{`${RESULT_TEXT[result]}さんのヘアカラー`}</TitleLabel>
        </div>
        <Image
          className="mx-auto mt-16 px-44"
          src={imagePaths.hair.src}
          alt={imagePaths.hair.alt}
          width={794}
          height={750}
        />
        <p className="mx-auto mt-16 w-1/2 whitespace-pre-line text-left font-sans">
          {resultTexts.hair}
        </p>
      </section>

      <section className="mt-32">
        <div className="px-48 text-left">
          <TitleLabel background={result}>SNSでシェア</TitleLabel>
        </div>
        <Image
          className="mt-16 px-44"
          src={imagePaths.share.src}
          alt={imagePaths.share.alt}
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
