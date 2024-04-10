export type BuildMode = "production" | "development";

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  assets: string;
  buildAssets: string;
  locales: string;
  buildLocales: string;
  src: {
    root: string;
    app: string;
    pages: string;
    widgets: string;
    features: string;
    entities: string;
    shared: string;
  }
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  apiUrl: string;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  apiUrl: string;
  project: "storybook" | "frontend" | "jest";
}
