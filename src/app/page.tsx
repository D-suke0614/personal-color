import TextLink from '@/components/TextLink/TextLink';
import Title from '@/components/Title/Title';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-between py-32 md:py-16">
      <div>
        <Title isFontBold={true} isFontKnewave={true}>
          Tone Match Me
        </Title>
        <p className="mt-16 text-center md:mt-8">
          あなたに合う色は何色ですか？
          <br />
          合う色を見つけるパーソナルカラー診断
        </p>
      </div>
      <Image
        className="w-auto md:h-80"
        src="/tone-match-me.png"
        alt="tone match me"
        width={1000}
        height={750}
      />
      <div className="w-fit">
        <TextLink target="_self" href="/tutorial">
          診断START
        </TextLink>
      </div>
    </div>
  );
}
