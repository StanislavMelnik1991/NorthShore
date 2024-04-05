import { StoryFn } from "@storybook/react";
import classNames from "classnames";
import styles from "./StyledDecorator.module.scss";

export const StyledDecorator = (StoryComponent: StoryFn) => (
  <div className={classNames("app", styles.wrapper)}>
    <StoryComponent />
  </div>
);
