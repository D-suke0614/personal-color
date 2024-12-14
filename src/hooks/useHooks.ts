import { useState } from 'react';

// あまりいい例思いつかなかったから適当、、、
// カスタムフックをここのディレクトリに突っ込んでいきます
export const useHooks = (initNum: number, incrementNum: number): number => {
  const [state, setState] = useState(initNum);
  setState(state + incrementNum);
  return state;
};
