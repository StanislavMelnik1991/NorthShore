import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PageDecorator, WhiteBgDecorator } from '@shared/lib';
import { Pagination } from './Pagination';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entity/Pagination',
  component: Pagination,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const News: Story = {
  args: {
    onChange: fn(),
    total: 99,
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    onChange: fn(),
    total: 99,
  },
  decorators: [PageDecorator],
};
