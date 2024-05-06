import type { Meta, StoryObj } from '@storybook/react';
import { PageDecorator, WhiteBgDecorator } from '@shared/lib';
import { SipData } from './SipData';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entity/SipData',
  component: SipData,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof SipData>;

export default meta;
type Story = StoryObj<typeof meta>;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Main: Story = {
  args: {
    ip_address: '192.168.1.1',
    password: 'Password',
    port: 3001,
  },
  decorators: [WhiteBgDecorator],
};
export const OnPage: Story = {
  args: {
    ip_address: '192.168.1.1',
    password: 'Password',
    port: 3001,
  },
  decorators: [PageDecorator],
};
