import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { STRING_EXAMPLE } from '@shared/constants/mock';
import { PageDecorator, WhiteBgDecorator } from '../../lib';
import { Text } from './Text';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared/Text',
  component: Text,

  tags: ['autodocs'],
  args: {},
  decorators: [],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: STRING_EXAMPLE,
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    children: STRING_EXAMPLE,
  },
  decorators: [PageDecorator],
};
