import type { Meta, StoryObj } from '@storybook/react';

import CustomImage from '@/components/CustomImage/CustomImage';

const meta = {
  title: 'Components/CustomImage',
  component: CustomImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof CustomImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    src: 'https://placehold.jp/1440x1024.png',
    alt: '画像',
    width: 1440,
    height: 1024,
    size: 'large',
  },
};

export const Medium: Story = {
  args: {
    src: 'https://placehold.jp/792x866.png',
    alt: '画像',
    width: 792,
    height: 866,
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    src: 'https://placehold.jp/316x316.png',
    alt: '画像',
    width: 316,
    height: 316,
    size: 'small',
  },
};
