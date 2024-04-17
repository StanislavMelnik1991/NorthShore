import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator } from '../../lib';
import { ToastsExample } from './Toasts.example';

const defaultText = 'some text';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared/Toasts',
  component: ToastsExample,
  decorators: [],
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof ToastsExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: defaultText,
    autoclose: true,
  },
  decorators: [PageDecorator],
};
