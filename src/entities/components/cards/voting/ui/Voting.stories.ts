import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { getStartOfMonth } from '@features/utils';
import { PageDecorator, WhiteBgDecorator } from '@shared/lib';
import { VotingCard } from './Voting';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entity/Voting',
  component: VotingCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof VotingCard>;

export default meta;
type Story = StoryObj<typeof meta>;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Main: Story = {
  args: {
    link: '',
    date: new Date(),
    title: 'Отсутствие горячей воды',
    deadLine: getStartOfMonth(new Date()),
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    link: '',
    date: new Date(),
    title: 'Отсутствие горячей воды',
    deadLine: getStartOfMonth(new Date()),
  },
  decorators: [PageDecorator],
};
