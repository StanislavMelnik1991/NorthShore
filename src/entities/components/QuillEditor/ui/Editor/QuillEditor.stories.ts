import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { HTML_STRING_EXAMPLE } from '@shared/constants/mock';
import { PageDecorator, WhiteBgDecorator } from '@shared/lib';
import { QuillEditor } from './QuillEditor';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entity/QuillEditor',
  component: QuillEditor,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof QuillEditor>;

export default meta;
type Story = StoryObj<typeof meta>;
const text = HTML_STRING_EXAMPLE;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Main: Story = {
  args: {
    initialValue: '',
    setValue: fn(),
    uploadImage: fn(),
  },
  decorators: [WhiteBgDecorator],
};
export const WithLabel: Story = {
  args: {
    label: 'Label text',
    initialValue: '',
    setValue: fn(),
    uploadImage: fn(),
  },
  decorators: [WhiteBgDecorator],
};
export const WithError: Story = {
  args: {
    label: 'Label text',
    error: 'error text',
    initialValue: '',
    setValue: fn(),
    uploadImage: fn(),
  },
  decorators: [WhiteBgDecorator],
};

export const TextExample: Story = {
  args: {
    initialValue: text,
    setValue: fn(),
    uploadImage: fn(),
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    initialValue: text,
    setValue: fn(),
    uploadImage: fn(),
  },
  decorators: [PageDecorator],
};
