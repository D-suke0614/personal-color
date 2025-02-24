import type { Meta, StoryObj } from '@storybook/react';

import ResultTemplate from '@/components/ResultTemplate/ResultTemplate';

const meta = {
  title: 'Components/ResultTemplate',
  component: ResultTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof ResultTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spring: Story = {
  args: {
    result: 'spring',
    shareImage: {
      src: '/result/spring_share.png',
      alt: '私は春イエベ',
    },
  },
};

export const Summer: Story = {
  args: {
    result: 'summer',
    shareImage: {
      src: '/result/summer_share.png',
      alt: '私はブルベ夏',
    },
  },
};

export const Autumn: Story = {
  args: {
    result: 'autumn',
    shareImage: {
      src: '/result/autumn_share.png',
      alt: '私はイエベ秋',
    },
  },
};

export const Winter: Story = {
  args: {
    result: 'winter',
    shareImage: {
      src: '/result/winter_share.png',
      alt: '私はブルベ冬',
    },
  },
};
