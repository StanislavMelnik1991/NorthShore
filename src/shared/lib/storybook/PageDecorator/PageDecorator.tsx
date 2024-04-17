/* eslint-disable @conarti/feature-sliced/layers-slices */
import { StoryFn } from '@storybook/react';
import { useUserSidebarConfig } from '@app/config';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import { MainLayout } from '@widgets/layouts';
import { SideBar } from '@widgets/SideBar';

export const PageDecorator = (StoryComponent: StoryFn) => {
  const config = useUserSidebarConfig();
  return (
    <MainLayout
      header={<Header />}
      content={<StoryComponent />}
      sidebar={<SideBar config={config} />}
      footer={<Footer />}
      burgerMenu={<SideBar config={config} />}
    />
  );
};
