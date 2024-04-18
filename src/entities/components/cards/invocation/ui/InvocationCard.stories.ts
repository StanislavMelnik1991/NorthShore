import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator, WhiteBgDecorator } from '@shared/lib';
import { InvocationCard } from './InvocationCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entity/InvocationCard',
  component: InvocationCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof InvocationCard>;

export default meta;
type Story = StoryObj<typeof meta>;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Main: Story = {
  args: {
    date: new Date(),
    id: 234,
    title: 'Отсутствие горячей воды',
    type: 'request',
    status: 1,
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    date: new Date(),
    id: 234,
    title: 'Отсутствие горячей воды',
    type: 'request',
    status: 1,
  },
  decorators: [PageDecorator],
};
