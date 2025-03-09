import type { Meta, StoryObj } from '@storybook/react';

import Toast from '@/components/Toast/Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Copied: Story = {
  args: {
    message: 'Copied!',
    isShow: true,
  },
};
