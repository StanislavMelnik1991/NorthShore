/* eslint-disable @conarti/feature-sliced/layers-slices */
import { StoryFn } from "@storybook/react";
import { Header } from "@widgets/Header";
import { MainLayout } from "@widgets/layouts";
import { SideBar } from "@widgets/SideBar";

export const PageDecorator = (StoryComponent: StoryFn) => (
  <MainLayout
    header={<Header />}
    content={<StoryComponent />}
    sidebar={<SideBar />}
  />
);
