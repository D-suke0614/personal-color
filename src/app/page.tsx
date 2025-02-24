import ResultTemplate from '@/components/ResultTemplate/ResultTemplate';

export default function Home() {
  const shareImage = {
    src: '/result/spring_share.png',
    alt: '私は春イエベ',
  };
  return (
    <>
      <ResultTemplate result="spring" shareImage={shareImage} />
    </>
  );
}
