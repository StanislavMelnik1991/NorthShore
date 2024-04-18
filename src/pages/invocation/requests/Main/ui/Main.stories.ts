import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator } from '@shared/lib';
import Page from './Page';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Page/RequestMain',
  component: Page,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const News: Story = {
  args: {},
};

export const OnPage: Story = {
  args: {},
  decorators: [PageDecorator],
};
