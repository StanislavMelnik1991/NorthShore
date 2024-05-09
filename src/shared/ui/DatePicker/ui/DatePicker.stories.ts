import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PageDecorator, WhiteBgDecorator } from '../../../lib';
import { DatePicker } from './DatePicker';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared/DatePicker',
  component: DatePicker,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const News: Story = {
  args: {
    selectsRange: false,
    onChange: fn(),
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    selectsRange: false,
    onChange: fn(),
  },
  decorators: [PageDecorator],
};
