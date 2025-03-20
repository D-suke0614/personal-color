import TextLink from '@/components/TextLink/TextLink';
import Title from '@/components/Title/Title';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative mx-auto flex h-screen flex-col items-center justify-between pb-16 pt-8">
      <div>
        <Title isFontBold={true} isFontKnewave={true}>
          Tone Match Me
        </Title>
        <p className="mt-8 text-center">
          あなたに合う色は何色ですか？
          <br />
          合う色を見つけるパーソナルカラー診断
        </p>
      </div>
      <Image
        className="transform-[transitionX[-50%]] absolute top-24 -z-10"
        src="/tone-match-me.png"
        alt="tone match me"
        width={1000}
        height={750}
      />
      <div className="w-fit">
        <TextLink target="_blank" href="/tutorial">
          診断START
        </TextLink>
      </div>
    </div>
  );
}
