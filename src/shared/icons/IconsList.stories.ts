import type { Meta, StoryObj } from '@storybook/react';
import { WhiteBgDecorator } from '../lib';
import { IconsGrid } from './IconsGrid';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Icons',
  component: IconsGrid,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
  decorators: [],
} satisfies Meta<typeof IconsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Main: Story = {
  args: {
    size: 24,
    theme: 'light',
  },
  decorators: [WhiteBgDecorator],
};
