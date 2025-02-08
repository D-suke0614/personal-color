import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Button/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Button>;

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
