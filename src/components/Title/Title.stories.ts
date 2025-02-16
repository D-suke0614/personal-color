import type { Meta, StoryObj } from '@storybook/react';

import Title from '@/components/Title/Title';

const meta = {
  title: 'Components/Title',
  component: Title,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    as: 'h1',
    children: 'Tone Match Me',
    isFontKnewave: true,
  },
};

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'Tone Match Me',
    isFontBold: true,
  },
};

export const H3: Story = {
  args: {
    as: 'h3',
    children: 'Tone Match Me',
  },
};

export const H4: Story = {
  args: {
    as: 'h4',
    children: 'Tone Match Me',
  },
};

export const H5: Story = {
  args: {
    as: 'h5',
    children: 'Tone Match Me',
  },
};

export const H6: Story = {
  args: {
    as: 'h6',
    children: 'Tone Match Me',
  },
};
