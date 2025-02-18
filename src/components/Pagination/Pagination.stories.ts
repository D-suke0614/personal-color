import type { Meta, StoryObj } from '@storybook/react';

import Pagination from '@/components/Pagination/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    onPageChange: () => {},
    handleKeyDown: () => {},
  },
};
