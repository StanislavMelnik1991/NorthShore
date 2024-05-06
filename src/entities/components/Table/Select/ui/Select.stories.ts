import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator, WhiteBgDecorator } from '@shared/lib';
import { TableSelect } from './Select';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entity/TableSelect',
  component: TableSelect,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof TableSelect>;

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
    options: options,
    placeholder: 'placeholder',
  },
  decorators: [PageDecorator, WhiteBgDecorator],
};
export const WithError: Story = {
  args: {
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
