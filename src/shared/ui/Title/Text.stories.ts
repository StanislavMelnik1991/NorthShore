import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "./Title";

const defaultText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Title",
  component: Title,

  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header1: Story = {
  args: {
    variant: "h1",
    children: defaultText,
  },
};

export const Header2: Story = {
  args: {
    variant: "h2",
    children: defaultText,
  },
};

export const Header3: Story = {
  args: {
    variant: "h3",
    children: defaultText,
  },
};

export const Header4: Story = {
  args: {
    variant: "h4",
    children: defaultText,
  },
};

export const WeightBold: Story = {
  args: {
    fontWeight: "bold",
    children: defaultText,
  },
};

export const WeightRNormal: Story = {
  args: {
    fontWeight: "normal",
    children: defaultText,
  },
};

export const WeightSemibold: Story = {
  args: {
    fontWeight: "semibold",
    children: defaultText,
  },
};
