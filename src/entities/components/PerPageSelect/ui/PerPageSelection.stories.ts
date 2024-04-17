import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PageDecorator, WhiteBgDecorator } from '@shared/lib';
import { PerPage } from './PerPage';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entity/PerPageSelection',
  component: PerPage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof PerPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const News: Story = {
  args: {
    active: 10,
    setActive: fn(),
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    active: 10,
    setActive: fn(),
  },
  decorators: [PageDecorator],
};
