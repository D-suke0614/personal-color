import type { Meta, StoryObj } from '@storybook/react';

import Tutorial from '@/components/Tutorial/Tutorial';

const meta = {
  title: 'Components/Tutorial',
  component: Tutorial,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Tutorial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
