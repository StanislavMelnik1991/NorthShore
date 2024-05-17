import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator, WhiteBgDecorator } from '../../lib';
import { Radio } from './Radio';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared/Radio',
  component: Radio,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
  decorators: [],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    label: 'label',
    checked: false,
    disabled: false,
    name: 'nameId',
  },
  decorators: [WhiteBgDecorator],
};
export const Checked: Story = {
  args: {
    label: 'label',
    checked: true,
    disabled: false,
    name: 'nameId',
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    label: 'label',
    disabled: false,
    name: 'nameId',
  },
  decorators: [PageDecorator],
};
