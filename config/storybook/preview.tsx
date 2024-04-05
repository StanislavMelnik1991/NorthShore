import type { Preview } from "@storybook/react";
import {
  StyledDecorator,
  RouterDecorator,
  SuspenseDecorator,
} from "../../src/shared/config/storybook";
import "../../src/app/styles/index.scss";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    class: "app",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [StyledDecorator, RouterDecorator, SuspenseDecorator],
};

export default preview;
