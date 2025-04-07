'use client';

import Table from '@/components/Table/Table';
import TextButton from '@/components/TextButton/TextButton';
import Title from '@/components/Title/Title';
import TitleLabel from '@/components/TitleLabel/TitleLabel';
import Toast from '@/components/Toast/Toast';
import { COLOR_CODES } from '@/constants/colorCodes';
import { resultImagePaths } from '@/constants/resultImagePaths';
import { resultText } from '@/constants/resultText';
import { snsImagePaths } from '@/constants/snsImagePaths';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  result: 'spring' | 'summer' | 'autumn' | 'winter';
};

const RESULT_TEXT = {
  spring: {
    label: '春 Spring',
    prefix: 'イエベ春',
    title: 'Spring',
    base: 'Yellow Base',
    catchphrase: 'かわいい/元気/明るい',
  },
  summer: {
    label: '夏 Summer',
    prefix: 'ブルベ夏',
    title: 'Summer',
    base: 'Blue Base',
    catchphrase: 'くすんだオシャレな色',
  },
  autumn: {
    label: '秋 Autumn',
    prefix: 'イエベ秋',
    title: 'Autumn',
    base: 'Yellow Base',
    catchphrase: '高級感&落ち着いた色',
  },
  winter: {
    label: '冬 Winter',
    prefix: 'ブルベ冬',
    title: 'Winter',
    base: 'Blue Base',
    catchphrase: '暗く鮮やかな色',
  },
} as const;

const BG_COLOR = {
  spring: '#F6EECC',
  summer: '#DBEBF8',
  autumn: '#DFD796',
  winter: '#BCD3DF',
} as const;

const ResultTemplate = ({ result }: Props) => {
  const imagePaths = resultImagePaths[result];
  const resultTexts = resultText[result];
  const [isShow, setIsShow] = useState(false);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href);
  }, [pageUrl]);

  const SNS_ITEM_LIST = [
    {
      key: 'line',
      // https://social-plugins.line.me/lineit/share?url=google.com$text=任意のテキストを埋め込める
      shareLink: `https://social-plugins.line.me/lineit/share?url=${pageUrl}`,
      ...snsImagePaths.line,
    },
    {
      key: 'x',
      // https://twitter.com/intent/tweet?url=google.com&text=ポストさせたい任意のテキストを埋め込める
      shareLink: `https://twitter.com/intent/tweet?url=${pageUrl}`,
      ...snsImagePaths.x,
    },
    {
      key: 'facebook',
      shareLink: `https://www.facebook.com/share.php?u=${pageUrl}`,
      ...snsImagePaths.facebook,
    },
    {
      key: 'share',
      shareLink: ``,
      ...snsImagePaths.share,
    },
  ] as const;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsShow(true);
    setTimeout(() => {
      setIsShow(false);
    }, 3000);
  };

  const shareUrl = async () => {
    try {
      await navigator.share({ url: pageUrl });
    } catch (_) {}
  };
  return (
    <div className="relative w-screen">
      <section
        className={clsx(
          'px-[10%] py-12 text-xl font-bold md:px-24',
          `bg-[${BG_COLOR[result]}]`,
        )}
      >
        <div className="relative z-0 flex flex-col items-center md:items-start">
          <TitleLabel background={result}>{`${RESULT_TEXT[result].label}`}</TitleLabel>
        </div>
        <div className="mt-12 flex flex-col items-center gap-y-6 text-center">
          <div>
            {/* storybookだとフォントおかしいけど、ページでみたらちゃん出てる？ */}
            {/* todo: title文字サイズとタグを分離して設定できるようにする */}
            {/* todo: というか、h1は「イエベ春」とかの方がよい？ここら辺踏まえて、コンポーネントについても調整したい */}
            <Title as="h1" isFontKnewave={true} isFontBold={true}>
              {RESULT_TEXT[result].title}
            </Title>
            <div className="mt-8">{RESULT_TEXT[result].prefix}</div>
          </div>
          <div>{RESULT_TEXT[result].base}</div>
          <Image
            className="mt-4 h-auto w-full md:w-[500px]"
            width={745}
            height={390}
            src={imagePaths.color.src}
            alt={imagePaths.color.alt}
          />
        </div>
        <div className="mt-10 flex flex-col items-center">
          <span className="rounded-md bg-black p-2 text-white">一言で言うと</span>
          <span
            className={clsx(
              'mt-10 w-full max-w-sm rounded-md border-2 border-black py-3 text-center text-[20px]',
              result === 'spring' || result === 'summer' ? 'text-black' : 'text-white',
            )}
            style={{ backgroundColor: COLOR_CODES[result] }}
          >
            {RESULT_TEXT[result].catchphrase}
          </span>
          <p className="mt-10 whitespace-pre-line text-center text-base">
            {resultTexts.color}
          </p>
        </div>
      </section>

      <section className="pt-12">
        <div className="relative z-0 flex flex-col items-center px-[10%] md:items-start md:px-24">
          <TitleLabel
            background={result}
          >{`${RESULT_TEXT[result].prefix}の特徴`}</TitleLabel>
        </div>
        <div className="flex justify-center">
          <Image
            className="pt-12 md:w-[500px]"
            src="/result/feature.png"
            alt="あなたの特徴"
            width={1450}
            height={1030}
          />
        </div>
        <div className="flex flex-col items-center px-[10%] md:px-24">
          <p className="whitespace-pre-line py-12 text-center">
            {resultText[result].characteristics}
          </p>
        </div>
        <Table resultText={resultTexts.feature} result={result} kind="feature" />
      </section>

      <section className="pt-12">
        <div className="relative z-0 flex flex-col items-center px-[10%] md:items-start md:px-24">
          <TitleLabel background={result}>あなたのファッション</TitleLabel>
        </div>
        <div className="flex flex-col items-center px-[10%] md:px-24">
          <Image
            className="md:h-94 w-auto pt-12"
            src={imagePaths.fashion.src}
            alt={imagePaths.fashion.alt}
            width={722}
            height={794}
          />
          <p className="whitespace-pre-line py-12 text-center">{resultTexts.fashion}</p>
        </div>
        <Table
          resultText={resultTexts.fashionColor}
          result={result}
          kind="fashionColor"
        />
      </section>

      <section className="pt-12">
        <div className="relative z-0 flex flex-col items-center px-[10%] md:items-start md:px-24">
          <TitleLabel
            background={result}
          >{`${RESULT_TEXT[result].prefix}に似合わない色`}</TitleLabel>
        </div>
        <div className="flex flex-col items-center px-[10%] md:px-24">
          <Image
            className="md:h-94 w-auto pt-12"
            src={imagePaths.badFashion.src}
            alt={imagePaths.badFashion.alt}
            width={794}
            height={750}
          />
          <p className="whitespace-pre-line pt-12 text-center">
            {resultTexts.badFashion}
          </p>
        </div>
      </section>

      <section className="pt-12">
        <div className="relative z-0 flex flex-col items-center px-[10%] md:items-start md:px-24">
          <TitleLabel
            background={result}
          >{`${RESULT_TEXT[result].prefix}のヘアカラー`}</TitleLabel>
        </div>
        <div className="flex flex-col items-center px-[10%] md:px-24">
          <Image
            className="md:h-94 w-auto pt-12"
            src={imagePaths.hair.src}
            alt={imagePaths.hair.alt}
            width={794}
            height={750}
          />
          <p className="whitespace-pre-line pt-12 text-center">{resultTexts.hair}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="relative z-0 flex flex-col items-center px-[10%] md:items-start md:px-24">
          <TitleLabel background={result}>SNSでシェア</TitleLabel>
        </div>
        <div className="flex justify-center">
          <Image
            className="pt-12 md:w-[500px]"
            src={imagePaths.share.src}
            alt={imagePaths.share.alt}
            width={1450}
            height={1030}
          />
        </div>
        <div className="flex flex-col items-center px-[10%] md:px-24">
          <div className="flex w-full justify-around pt-12 md:w-[500px]">
            {SNS_ITEM_LIST.map(({ key, src, alt, shareLink }) =>
              key === 'share' ? (
                <div key={key} className="size-[60px]">
                  <button type="button" onClick={shareUrl}>
                    <Image src={src} alt={alt} width={100} height={100} />
                  </button>
                </div>
              ) : (
                <Link
                  key={key}
                  href={shareLink}
                  target="_blank"
                  className="block size-[60px]"
                >
                  <Image src={src} alt={alt} width={100} height={100} />
                </Link>
              ),
            )}
          </div>
          <div className="mt-12 text-center">
            <TextButton onClick={copyToClipboard}>診断結果リンクをコピーする</TextButton>
          </div>
          <p className="whitespace-pre-line pt-12 text-center">
            コピーしたリンクをSNSに投稿すると、
            <br />
            診断結果の画像付きで投稿になります。
          </p>
          <p className="whitespace-pre-line pt-4 text-center">
            友達やフォロワーに
            <br />
            診断結果をシェアしてみましょう！
          </p>
        </div>
      </section>
      <div className="absolute bottom-32 flex w-screen justify-center">
        <Toast isShow={isShow}>コピーしました！</Toast>
      </div>
    </div>
  );
};

export default ResultTemplate;
