import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PageDecorator, WhiteBgDecorator } from '@shared/lib';
import { CustomDatePicker } from './DatePicker';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entity/DatePicker',
  component: CustomDatePicker,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof CustomDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const News: Story = {
  args: {
    startDate: new Date(),
    setStartDate: fn(),
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    startDate: new Date(),
    setStartDate: fn(),
  },
  decorators: [PageDecorator],
};
