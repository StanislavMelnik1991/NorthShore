import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { PageDecorator, WhiteBgDecorator } from "@shared/config";
import { Cover } from "./Cover";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Entity/Cover",
  component: Cover,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Cover>;

export default meta;
type Story = StoryObj<typeof meta>;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Main: Story = {
  args: {
    src: "https://northwaterfront.evocontrols.com/files/f6b5bfc85d33b8b0.jpg",
    onRemove: fn(),
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    src: "https://northwaterfront.evocontrols.com/files/f6b5bfc85d33b8b0.jpg",
    onRemove: fn(),
  },
  decorators: [PageDecorator],
};
