import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator, WhiteBgDecorator } from '../../lib';
import { TableExample } from './Table.example';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared/Table',
  component: TableExample,

  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof TableExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {},
  decorators: [PageDecorator],
};
