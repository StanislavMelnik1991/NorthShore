import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator, WhiteBgDecorator } from '../../lib';
import { StyledTextAria } from './TextAria';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared/TextAria',
  component: StyledTextAria,

  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof StyledTextAria>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Find',
  },
  decorators: [WhiteBgDecorator],
};

export const Label: Story = {
  args: {
    placeholder: 'Find',
    label: 'Title',
  },
  decorators: [WhiteBgDecorator],
};

export const Error: Story = {
  args: {
    placeholder: 'Find',
    error: 'Non found',
  },
  decorators: [WhiteBgDecorator],
};

export const ErrorWithLabel: Story = {
  args: {
    placeholder: 'Find',
    error: 'Non found',
    label: 'Title',
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    placeholder: 'Find',
  },
  decorators: [PageDecorator],
};
