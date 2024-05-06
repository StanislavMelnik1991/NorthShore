import type { Meta, StoryObj } from '@storybook/react';
import { STRING_EXAMPLE } from '../../constants';
import { PageDecorator, WhiteBgDecorator } from '../../lib';
import { Title } from './Title';

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
    children: STRING_EXAMPLE,
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    children: STRING_EXAMPLE,
  },
  decorators: [PageDecorator],
};
