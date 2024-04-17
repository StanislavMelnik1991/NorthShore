import type { Preview } from '@storybook/react';
import {
  StylesDecorator,
  RouterDecorator,
  SuspenseDecorator,
} from '../../src/shared/lib';
import { mockImagesUpload, mockNews } from './mockData';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    class: 'app',
    mockAddonConfigs: {
      globalMockData: [mockNews, mockImagesUpload],
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
