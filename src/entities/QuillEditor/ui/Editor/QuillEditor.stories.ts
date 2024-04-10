import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { PageDecorator, WhiteBgDecorator } from "@shared/config";
import { QuillEditor } from "./QuillEditor";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Entity/QuillEditor",
  component: QuillEditor,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof QuillEditor>;

export default meta;
type Story = StoryObj<typeof meta>;
const text = `<p>some text</p><p>normal</p><h1>header</h1><h2>header2</h2><p><strong>bold</strong></p><p><em>italic</em></p><p><u>underline</u></p><p><s>error</s></p><blockquote>quotes</blockquote><p>numeric: </p><ol><li>asd</li><li>asd</li><li>asd</li><li>asd</li><li>asd</li></ol><p>doted: </p><ul><li>asd</li><li>asd</li><li>asd</li><li>asd</li><li>asd</li></ul><p class="ql-indent-1">paragraph</p><p><a href="https://main--north-waterfront.netlify.app/" rel="noopener noreferrer" target="_blank">link</a></p><p><br></p><p>image:</p><p><img src="https://signal.avg.com/hs-fs/hubfs/Blog_Content/Avg/Signal/AVG%20Signal%20Images/how_to_set_your_default_browser_signal/Signal-How-to-Set-Your-Default-Browser-on-Any-Device-Hero.jpg?width=1200&amp;name=Signal-How-to-Set-Your-Default-Browser-on-Any-Device-Hero.jpg"></p><p><br></p><p>video content:</p><figure class="video-container" style="margin: 0px;"><div class="video-wrapper"><iframe src="https://www.youtube.com/embed/uqZwe01PwnY" class="ql-video content-video youtube" allowfullscreen="true" frameborder="0" style="width: 100%; aspect-ratio: 800 / 450; margin: 0px auto; overflow: hidden;"></iframe></div></figure><p><br></p><p>some text</p><p>some long text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Main: Story = {
  args: {
    initialValue: "",
    setValue: fn(),
    uploadImage: fn(),
  },
  decorators: [WhiteBgDecorator],
};
export const WithLabel: Story = {
  args: {
    label: "Label text",
    initialValue: "",
    setValue: fn(),
    uploadImage: fn(),
  },
  decorators: [WhiteBgDecorator],
};
export const WithError: Story = {
  args: {
    label: "Label text",
    error: "error text",
    initialValue: "",
    setValue: fn(),
    uploadImage: fn(),
  },
  decorators: [WhiteBgDecorator],
};

export const TextExample: Story = {
  args: {
    initialValue: text,
    setValue: fn(),
    uploadImage: fn(),
  },
  decorators: [WhiteBgDecorator],
};

export const OnPage: Story = {
  args: {
    initialValue: text,
    setValue: fn(),
    uploadImage: fn(),
  },
  decorators: [PageDecorator],
};
