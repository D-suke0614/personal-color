import type { Meta, StoryObj } from '@storybook/react';

import TextLink from '@/components/TextLink/TextLink';

const meta = {
  title: 'Components/TextLink',
  component: TextLink,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spring: Story = {
  args: {
    children: '診断START',
    href: '',
    target: '_blank',
  },
};
