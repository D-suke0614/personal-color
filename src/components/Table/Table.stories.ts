import type { Meta, StoryObj } from '@storybook/react';

import Table from '@/components/Table/Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FeatureSpring: Story = {
  args: {
    result: 'spring',
    kind: 'feature',
  },
};

export const FeatureSummer: Story = {
  args: {
    result: 'summer',
    kind: 'feature',
  },
};

export const FeatureAutumn: Story = {
  args: {
    result: 'autumn',
    kind: 'feature',
  },
};

export const FeatureWinter: Story = {
  args: {
    result: 'winter',
    kind: 'feature',
  },
};

export const FashionColorSpring: Story = {
  args: {
    result: 'spring',
    kind: 'fashionColor',
  },
};

export const FashionColorSummer: Story = {
  args: {
    result: 'summer',
    kind: 'fashionColor',
  },
};

export const FashionColorAutumn: Story = {
  args: {
    result: 'autumn',
    kind: 'fashionColor',
  },
};

export const FashionColorWinter: Story = {
  args: {
    result: 'winter',
    kind: 'fashionColor',
  },
};
