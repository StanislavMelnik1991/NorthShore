import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PageDecorator, WhiteBgDecorator } from '../../lib';
import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared/Button',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: { onClick: fn() },
  decorators: [],
  argTypes: {
    children: { name: 'text', defaultValue: 'Button text', type: 'string' },
    disabled: { name: 'disabled', defaultValue: false, type: 'boolean' },
    loading: { name: 'loading', defaultValue: false, type: 'boolean' },
    width: { name: 'width', type: 'number' },
    height: { name: 'height', type: 'number' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Button text',
    disabled: false,
    loading: false,
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    children: 'Button text',
    disabled: false,
    loading: false,
  },
  decorators: [PageDecorator],
};
