import type { Meta, StoryObj } from "@storybook/react";
import { WhiteBgDecorator } from "../../config/storybook";
import { Text } from "./Text";

const defaultText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Text",
  component: Text,

  tags: ["autodocs"],
  args: {},
  decorators: [WhiteBgDecorator],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body16: Story = {
  args: {
    variant: "body16",
    children: defaultText,
  },
};

export const Body14: Story = {
  args: {
    variant: "body14",
    children: defaultText,
  },
};

export const Body13: Story = {
  args: {
    variant: "body13",
    children: defaultText,
  },
};

export const Small: Story = {
  args: {
    variant: "small",
    children: defaultText,
  },
};

export const WeightMedium: Story = {
  args: {
    fontWeight: "medium",
    children: defaultText,
  },
};

export const WeightRegular: Story = {
  args: {
    fontWeight: "regular",
    children: defaultText,
  },
};

export const WeightSemibold: Story = {
  args: {
    fontWeight: "semibold",
    children: defaultText,
  },
};
