import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator, WhiteBgDecorator } from '@shared/lib';
import { StyledSelect } from './Select';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entity/Select',
  component: StyledSelect,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof StyledSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const Main: Story = {
  args: {
    options: options,
  },
  decorators: [PageDecorator, WhiteBgDecorator],
};
export const WithLabel: Story = {
  args: {
    label: 'Label',
    options: options,
    placeholder: 'placeholder',
  },
  decorators: [PageDecorator, WhiteBgDecorator],
};
export const WithError: Story = {
  args: {
    error: 'error',
    options: options,
  },
  decorators: [PageDecorator, WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    options: options,
  },
  decorators: [PageDecorator],
};
