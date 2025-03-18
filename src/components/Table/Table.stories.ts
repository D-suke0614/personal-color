import { resultText } from '@/constants/resultText';
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
    resultText: resultText.spring.feature,
    result: 'spring',
    kind: 'feature',
  },
};

export const FeatureSummer: Story = {
  args: {
    resultText: resultText.summer.feature,
    result: 'summer',
    kind: 'feature',
  },
};

export const FeatureAutumn: Story = {
  args: {
    resultText: resultText.autumn.feature,
    result: 'autumn',
    kind: 'feature',
  },
};

export const FeatureWinter: Story = {
  args: {
    resultText: resultText.winter.feature,
    result: 'winter',
    kind: 'feature',
  },
};

export const FashionColorSpring: Story = {
  args: {
    resultText: resultText.spring.fashionColor,
    result: 'spring',
    kind: 'fashionColor',
  },
};

export const FashionColorSummer: Story = {
  args: {
    resultText: resultText.summer.fashionColor,
    result: 'summer',
    kind: 'fashionColor',
  },
};

export const FashionColorAutumn: Story = {
  args: {
    resultText: resultText.autumn.fashionColor,
    result: 'autumn',
    kind: 'fashionColor',
  },
};

export const FashionColorWinter: Story = {
  args: {
    resultText: resultText.winter.fashionColor,
    result: 'winter',
    kind: 'fashionColor',
  },
};
