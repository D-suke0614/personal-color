'use client';

import { TABLE_COLOR_CODES } from '@/constants/colorCodes';

type ResultText = {
  id: number;
  text: string;
};

type TableProps = {
  resultText: ResultText[];
  result: 'spring' | 'summer' | 'autumn' | 'winter';
  kind: 'feature' | 'fashionColor';
};

const FEATURE_LABEL = ['肌', '髪', '目'] as const;
const FASHION_LABEL = [
  'ベーシック',
  'ピンク系',
  'ブルー系',
  'モノトーン',
  'グリーン系',
  'レッド系',
  'イエロー系',
  'パープル系',
] as const;

const Table = ({ resultText, result, kind }: TableProps) => {
  const label = kind === 'feature' ? FEATURE_LABEL : FASHION_LABEL;

  return (
    <div>
      <table className="w-full table-fixed">
        <tbody>
          {resultText.map((data, i) => (
            <tr
              className={
                i % 2 == 1 ? 'bg-[#F8F7F7]' : `bg-[${TABLE_COLOR_CODES[result]}]`
              }
              key={data.id}
            >
              <td className="h-24 w-1/4 border-r border-[#DDDDDD] text-center text-base md:h-32">
                {label[i]}
              </td>
              <td className="h-24 w-3/4 whitespace-pre-line text-xs md:h-32">
                <div className="mx-auto w-[50vw] max-sm:w-[95%]">{data.text}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
