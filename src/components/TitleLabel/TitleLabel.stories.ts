import type { Meta, StoryObj } from '@storybook/react';

import TitleLabel from '@/components/TitleLabel/TitleLabel';

const meta = {
  title: 'Components/TitleLabel',
  component: TitleLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof TitleLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spring: Story = {
  args: {
    children: '春 Spring',
    background: 'spring',
  },
};

export const Summer: Story = {
  args: {
    children: 'ブルベ夏の特徴',
    background: 'summer',
  },
};

export const Autumn: Story = {
  args: {
    children: 'あなたのファッション',
    background: 'autumn',
  },
};

export const Winter: Story = {
  args: {
    children: 'ブルベ冬さんのヘアカラー',
    background: 'winter',
  },
};
