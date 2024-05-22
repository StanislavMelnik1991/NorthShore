import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PageDecorator, WhiteBgDecorator } from '../../../lib';
import { CodeEditor } from './CodeEditor';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared/CodeEditor',
  component: CodeEditor,

  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof CodeEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
  },
  decorators: [WhiteBgDecorator],
};

export const Label: Story = {
  args: {
    label: 'Title',
    onChange: fn(),
  },
  decorators: [WhiteBgDecorator],
};

export const Error: Story = {
  args: {
    error: 'Non found',
    onChange: fn(),
  },
  decorators: [WhiteBgDecorator],
};

export const ErrorWithLabel: Story = {
  args: {
    error: 'Non found',
    label: 'Title',
    onChange: fn(),
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    onChange: fn(),
  },
  decorators: [PageDecorator],
};
