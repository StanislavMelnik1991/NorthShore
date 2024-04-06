import type { Meta, StoryObj } from "@storybook/react";
import { WhiteBgDecorator } from "../../config/storybook";
import { TextField } from "./TextField";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/TextField",
  component: TextField,

  tags: ["autodocs"],
  args: {},
  decorators: [WhiteBgDecorator],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    placeholder: "Find",
  },
};

export const Error: Story = {
  args: {
    placeholder: "Find",
    error: "something wrong",
  },
};
