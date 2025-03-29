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
        <p className="text-center">
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
        <p className="text-center">
          服やメイク選び服やメイク選びの時に自分にに合わない色の
          <br />
          アイテムを購入して後悔することがなくなる。
          <br />
          モテたい！垢抜けたい！
          <br />
          自分に似合う色を使いこなすことができる！
        </p>
      ),
    },
    {
      title: 'PCやスマホを使ってカメラで顔を写すだけ！',
      content: (
        <>
          <Image
            className="mx-auto mt-6"
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
            あなたにあった色やコーデポイント
            <br />
            今更聞けない活かし方を知れる
          </p>
          <Image
            className="mx-auto mt-6"
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
          <div className="mx-auto mt-16 flex w-3/5 justify-around">
            {SNS_ITEM_LIST.map(({ key, src, alt }) => (
              <div key={key}>
                <Image src={src} alt={alt} width={100} height={100} />
              </div>
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <Tutorial contents={CAROUSEL_CONTENTS} />
    </div>
  );
}
