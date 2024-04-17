import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator, WhiteBgDecorator } from '../../lib';
import { Title } from './Title';

const defaultText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared/Title',
  component: Title,
  decorators: [],
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: defaultText,
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    children: defaultText,
  },
  decorators: [PageDecorator],
};
