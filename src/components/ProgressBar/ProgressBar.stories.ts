import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from '@/components/ProgressBar/ProgressBar'; // importする

const meta = {
  title: 'Components/ProgressBar', // storybook上のパス
  component: ProgressBar, // コンポーネント名入れる
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof ProgressBar>; // コンポーネント名入れる

export default meta;
type Story = StoryObj<typeof meta>; //おまじない

export const Primary: Story = {
  args: {
    initialProgress: 0,
  },
};
