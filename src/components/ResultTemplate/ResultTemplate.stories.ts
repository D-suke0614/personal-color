import type { Meta, StoryObj } from '@storybook/react';

import ResultTemplate from '@/components/ResultTemplate/ResultTemplate';

const meta = {
  title: 'Components/ResultTemplate',
  component: ResultTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof ResultTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spring: Story = {
  args: {
    result: 'spring',
  },
};

export const Summer: Story = {
  args: {
    result: 'summer',
  },
};

export const Autumn: Story = {
  args: {
    result: 'autumn',
  },
};

export const Winter: Story = {
  args: {
    result: 'winter',
  },
};
