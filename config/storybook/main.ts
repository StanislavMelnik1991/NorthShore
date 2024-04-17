import path from 'path';
import { Configuration, DefinePlugin, RuleSetRule } from 'webpack';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    'storybook-addon-mock',
    '@storybook/addon-interactions',
    'storybook-addon-themes',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config: Configuration) => {
    const paths = {
      build: '',
      html: '',
      entry: '',
      src: {
        root: path.resolve(__dirname, '..', '..', 'src'),
        app: path.resolve(__dirname, '..', '..', 'src', 'app'),
        pages: path.resolve(__dirname, '..', '..', 'src', 'pages'),
        widgets: path.resolve(__dirname, '..', '..', 'src', 'widgets'),
        features: path.resolve(__dirname, '..', '..', 'src', 'features'),
        entities: path.resolve(__dirname, '..', '..', 'src', 'entities'),
        shared: path.resolve(__dirname, '..', '..', 'src', 'shared'),
      },
      locales: '',
      buildLocales: '',
    };
    config!.resolve!.modules!.push(paths.src.root);
    config!.resolve!.extensions!.push('.ts', '.tsx');
    config!.resolve!.alias = {
      '@root': paths.src.root,
      '@app': paths.src.app,
      '@pages': paths.src.pages,
      '@widgets': paths.src.widgets,
      '@features': paths.src.features,
      '@entities': paths.src.entities,
      '@shared': paths.src.shared,
      ...config!.resolve!.alias,
    };

    config!.module!.rules = config!.module!.rules!.map(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
          return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
      },
    );

    config!.module!.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config!.module!.rules.push(buildCssLoader(true));

    config!.plugins!.push(
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://testapi.ru'),
        __PROJECT__: JSON.stringify('storybook'),
      }),
    );
    // Return the altered config
    return config;
  },
};
