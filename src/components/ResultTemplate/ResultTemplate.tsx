'use client';

import Table from '@/components/Table/Table';
import TextButton from '@/components/TextButton/TextButton';
import Title from '@/components/Title/Title';
import TitleLabel from '@/components/TitleLabel/TitleLabel';
import Toast from '@/components/Toast/Toast';
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
    <div className="w-screen pb-32">
      <section
        className={clsx('pb-36 pt-12 text-xl font-bold', `bg-[${BG_COLOR[result]}]`)}
      >
        <div className="relative z-0 px-48 text-left">
          <TitleLabel background={result}>{`${RESULT_TEXT[result].label}`}</TitleLabel>
          <div className="mt-12 flex flex-col gap-y-6 text-center">
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
          </div>
        </div>
        <Image
          className="mx-auto mt-16 px-44"
          width={745}
          height={390}
          src={imagePaths.color.src}
          alt={imagePaths.color.alt}
        />
        <div className="mt-20 text-white">
          <span className="mx-auto block w-fit rounded-md bg-black p-2">
            一言で言うと
          </span>
        </div>
        <div className="mt-14 text-4xl">
          <span className="mx-auto block w-fit rounded-md border-2 border-black bg-[#FFCEDF] p-5">
            {RESULT_TEXT[result].catchphrase}
          </span>
        </div>
        <p className="mt-24 whitespace-pre-line text-center">{resultTexts.color}</p>
      </section>
      <section className="mt-32">
        <div className="px-48 text-left">
          <TitleLabel
            background={result}
          >{`${RESULT_TEXT[result].prefix}の特徴`}</TitleLabel>
        </div>
        <Image
          className="mx-auto mt-16 px-44"
          src="/result/feature.png"
          alt="あなたの特徴"
          width={1450}
          height={1030}
        />
        <div className="mt-16 whitespace-pre-line text-center">
          {resultText[result].characteristics}
        </div>
        <div className="mx-44 mt-16">
          <Table resultText={resultTexts.feature} result={result} kind="feature" />
        </div>
      </section>
      {/* ③ */}
      {/* ④ */}

      <section className="mt-32">
        <div className="px-48 text-left">
          <TitleLabel background={result}>あなたのファッション</TitleLabel>
        </div>
        <Image
          className="mx-auto mt-16 px-44"
          src={imagePaths.fashion.src}
          alt={imagePaths.fashion.alt}
          width={722}
          height={794}
        />
        <p className="mx-auto mt-16 w-1/2 whitespace-pre-line text-center">
          {resultTexts.fashion}
        </p>
        <div className="mx-44 mt-16">
          <Table
            resultText={resultTexts.fashionColor}
            result={result}
            kind="fashionColor"
          />
        </div>
      </section>

      <section className="mt-32">
        <div className="px-48 text-left">
          <TitleLabel
            background={result}
          >{`${RESULT_TEXT[result].prefix}さんに似合わない色`}</TitleLabel>
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
          >{`${RESULT_TEXT[result].prefix}さんのヘアカラー`}</TitleLabel>
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
          className="mx-auto mt-16 px-44"
          src={imagePaths.share.src}
          alt={imagePaths.share.alt}
          width={1450}
          height={1030}
        />
        <div className="mx-auto mt-16 flex w-3/5 justify-around">
          {SNS_ITEM_LIST.map(({ key, src, alt, shareLink }) =>
            key === 'share' ? (
              <div key={key}>
                <button type="button" onClick={shareUrl}>
                  <Image src={src} alt={alt} width={100} height={100} />
                </button>
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
      <div className="mx-[500px] mt-9 text-center">
        <Toast isShow={isShow}>コピーしました！</Toast>
      </div>
    </div>
  );
};

export default ResultTemplate;
