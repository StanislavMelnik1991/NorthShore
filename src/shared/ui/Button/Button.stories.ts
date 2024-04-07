import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { PageDecorator, WhiteBgDecorator } from "../../config/storybook";
import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Shared/Button",
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: { onClick: fn() },
  decorators: [],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: "badge text",
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    children: "badge text",
  },
  decorators: [PageDecorator],
};
