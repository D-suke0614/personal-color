import type { Meta, StoryObj } from '@storybook/react';

import TextButton from '@/components/TextButton/TextButton';

const meta = {
  title: 'Components/TextButton',
  component: TextButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    onClick: () => {
      console.log('clicked');
    },
    type: 'button',
  },
};

export const Sample: Story = {
  args: {
    children: '診断結果リンクをコピーする',
    onClick: () => {
      console.log('clicked');
    },
    type: 'button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};
