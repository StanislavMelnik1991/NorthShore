/* eslint-disable @conarti/feature-sliced/layers-slices */
import { StoryFn } from "@storybook/react";
import { Header } from "@widgets/Header";
import { SideBar } from "@widgets/SideBar";
import { MainLayout } from "../../../layouts";

export const PageDecorator = (StoryComponent: StoryFn) => (
  <MainLayout
    header={<Header />}
    content={<StoryComponent />}
    sidebar={<SideBar />}
  />
);
