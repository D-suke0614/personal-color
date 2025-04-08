import Tutorial from '@/components/Tutorial/Tutorial';
import { snsImagePaths } from '@/constants/snsImagePaths';
import Image from 'next/image';

export default function Page() {
  const SNS_ITEM_LIST = [
    {
      key: 'line',
      ...snsImagePaths.line,
    },
    {
      key: 'x',
      ...snsImagePaths.x,
    },
    {
      key: 'facebook',
      ...snsImagePaths.facebook,
    },
  ] as const;

  const CAROUSEL_CONTENTS = [
    {
      title: 'Hello',
      content: (
        <p className="text-center text-lg/10">
          Tone Match Meでは、
          <br />
          あなたの色が何色に合うのか？を
          <br />
          診断で知ることが出来ます
        </p>
      ),
    },
    {
      title: '自分の色がわかると',
      content: (
        <p className="text-center text-lg/10">
          服やメイク選び服やメイク選びの時に
          <br />
          自分に似合わない色のアイテムを購入して
          <br />
          後悔することがなくなる。
          <br />
          <br />
          モテたい！垢抜けたい！
          <br />
          自分に似合う色を使いこなすことができる！
        </p>
      ),
    },
    {
      title: 'PC/スマホで、カメラに顔を写すだけ！',
      content: (
        <>
          <Image
            className="w-4/5 md:w-[500px]"
            src="/tutorial/face-scan.png"
            alt="PCやスマホを使ってカメラで顔を写すだけ！"
            width={500}
            height={295}
          />
        </>
      ),
    },
    {
      title: 'あなたに合う色がわかる！',
      content: (
        <div>
          <p className="text-center">
            あなたに合った色やコーデポイント
            <br />
            今更聞けない活かし方を知れる
          </p>
          <Image
            className="mt-16 md:mt-6 md:w-[500px]"
            src="/tutorial/color-palette.png"
            alt="あなたに合う色がわかる！"
            width={576}
            height={342}
          />
        </div>
      ),
    },
    {
      title: 'SNSでもシェアできる！',
      content: (
        <>
          <p className="text-center">自分の診断結果をSNSでも共有できる！</p>
          <div className="flex w-2/3 flex-wrap justify-center gap-8">
            {SNS_ITEM_LIST.map(({ key, src, alt }) => (
              <div key={key} className="">
                <Image className="" src={src} alt={alt} width={100} height={100} />
              </div>
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="h-screen">
      <Tutorial contents={CAROUSEL_CONTENTS} />
    </div>
  );
}
