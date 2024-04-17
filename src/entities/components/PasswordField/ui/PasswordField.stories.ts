import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator, WhiteBgDecorator } from '@shared/lib';
import { PasswordField } from './PasswordField';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entity/PasswordField',
  component: PasswordField,

  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter password',
  },
  decorators: [WhiteBgDecorator],
};

export const Label: Story = {
  args: {
    placeholder: 'Enter password',
    label: 'Title',
  },
  decorators: [WhiteBgDecorator],
};

export const Error: Story = {
  args: {
    placeholder: 'Enter password',
    error: 'incorrect password',
  },
  decorators: [WhiteBgDecorator],
};

export const ErrorWithLabel: Story = {
  args: {
    placeholder: 'Enter password',
    error: 'incorrect password',
    label: 'Title',
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    placeholder: 'Enter password',
  },
  decorators: [PageDecorator],
};
