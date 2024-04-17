import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator, WhiteBgDecorator } from '@shared/lib';
import { PageHeader } from './PageHeader';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entity/PageHeader',
  component: PageHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Main: Story = {
  args: {
    breadcrumbs: [
      { href: '', title: 'Новости' },
      { href: '', title: 'Создание новости' },
    ],
  },
  decorators: [WhiteBgDecorator],
};
export const OnPage: Story = {
  args: {
    breadcrumbs: [
      { href: '', title: 'Новости' },
      { href: '', title: 'Создание новости' },
    ],
  },
  decorators: [PageDecorator],
};
