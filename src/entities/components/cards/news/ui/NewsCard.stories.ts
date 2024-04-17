import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator, WhiteBgDecorator } from '@shared/lib';
import { NewsCard } from './NewsCard';

const defaultText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entity/NewsCard',
  component: NewsCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof NewsCard>;

export default meta;
type Story = StoryObj<typeof meta>;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Main: Story = {
  args: {
    text: defaultText,
    title: defaultText,
    published_date: new Date(),
    image: 'https://northwaterfront.evocontrols.com/files/b654ab99781ad3fc.jpg',
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    text: defaultText,
    title: defaultText,
    published_date: new Date(),
    image: 'https://northwaterfront.evocontrols.com/files/b654ab99781ad3fc.jpg',
  },
  decorators: [PageDecorator],
};
