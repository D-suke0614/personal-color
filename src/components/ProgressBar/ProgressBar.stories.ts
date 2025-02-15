import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from '@/components/ProgressBar/ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    progressValue: 0,
  },
};

export const FiftyPercent: Story = {
  args: {
    progressValue: 50,
  },
};

export const HundredPercent: Story = {
  args: {
    progressValue: 100,
  },
};
