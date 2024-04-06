/* eslint-disable @conarti/feature-sliced/layers-slices */
import { StoryFn } from "@storybook/react";
import classNames from "classnames";
import { Header } from "@widgets/Header";
import { SideBar } from "@widgets/SideBar";
import { MainLayout } from "../../../layouts";
import styles from "./PageDecorator.module.scss";

export const PageDecorator = (StoryComponent: StoryFn) => (
  <MainLayout
    header={<Header />}
    content={<StoryComponent />}
    sidebar={<SideBar />}
    className={classNames("app", styles.wrapper)}
  />
);
