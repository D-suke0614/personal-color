'use client';

import { TABLE_COLOR_CODES } from '@/constants/colorCodes';
import { resultText } from '@/constants/resultText';

type TableProps<T> = {
  result: 'spring' | 'summer' | 'autumn' | 'winter';
  kind: 'feature' | 'fashionColor';
};

const FEATURE_LABEL = ['肌', '髪', '目'] as const;
const FASHION_LABEL = [
  'ベーシックカラー',
  'ピンク系',
  '青系',
  'モノトーンカラー',
  'グリーン系',
  'レッド系',
  'イエロー系',
  'パープル系',
] as const;

const Table = <T,>({ result, kind }: TableProps<T>) => {
  const data =
    kind === 'feature' ? resultText[result].feature : resultText[result].fashionColor;

  const label = kind === 'feature' ? FEATURE_LABEL : FASHION_LABEL;

  return (
    <div className="w-screen">
      <table className="w-full table-fixed">
        <tbody>
          {data.map((text, i) => (
            <tr
              className={
                i % 2 == 1 ? 'bg-[#F8F7F7]' : `bg-[${TABLE_COLOR_CODES[result]}]`
              }
              key={i}
            >
              <td className="h-32 w-1/4 border-r border-[#DDDDDD] text-center text-base">
                {label[i]}
              </td>
              <td className="h-32 w-3/4 whitespace-pre-line text-xs">
                <div className="mx-auto w-[50vw] max-sm:w-[95%]">{text}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
