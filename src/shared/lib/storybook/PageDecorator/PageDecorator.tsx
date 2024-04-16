/* eslint-disable @conarti/feature-sliced/layers-slices */
import { StoryFn } from "@storybook/react";
import { Footer } from "@widgets/Footer";
import { Header } from "@widgets/Header";
import { MainLayout } from "@widgets/layouts";
import { SideBar } from "@widgets/SideBar";
import { useUserSidebarConfig } from "@entities/config";

export const PageDecorator = (StoryComponent: StoryFn) => {
  const config = useUserSidebarConfig();
  return (
    <MainLayout
      header={<Header burgerMenu={<SideBar config={config} />} />}
      content={<StoryComponent />}
      sidebar={<SideBar config={config} />}
      footer={<Footer />}
    />
  );
};
