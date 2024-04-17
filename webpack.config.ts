import path from 'path';
import { config } from 'dotenv';
import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

config({ path: '.env' });

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    assets: path.resolve(__dirname, 'public', 'assets'),
    buildAssets: path.resolve(__dirname, 'build', 'assets'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
    src: {
      root: path.resolve(__dirname, 'src'),
      app: path.resolve(__dirname, 'src', 'app'),
      pages: path.resolve(__dirname, 'src', 'pages'),
      widgets: path.resolve(__dirname, 'src', 'widgets'),
      features: path.resolve(__dirname, 'src', 'features'),
      entities: path.resolve(__dirname, 'src', 'entities'),
      shared: path.resolve(__dirname, 'src', 'shared'),
    },
  };

  const mode = env?.mode || 'development';
  const PORT = Number(process.env.PORT);
  const apiUrl = process.env.API_URL as string;

  const isDev = mode === 'development';

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    apiUrl,
    project: 'frontend',
  });
  return config;
};
