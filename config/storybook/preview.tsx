import type { Preview } from "@storybook/react";
import {
  StylesDecorator,
  RouterDecorator,
  SuspenseDecorator,
} from "../../src/shared/config";
import { mockNews } from "./mockData";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    class: "app",
    mockAddonConfigs: {
      globalMockData: [mockNews],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [StylesDecorator, RouterDecorator, SuspenseDecorator],
};

export default preview;
