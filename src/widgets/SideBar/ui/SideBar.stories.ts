import type { Meta, StoryObj } from "@storybook/react";
import { SideBar } from "./SideBar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/SideBar",
  component: SideBar,

  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header1: Story = {
  args: {},
};
