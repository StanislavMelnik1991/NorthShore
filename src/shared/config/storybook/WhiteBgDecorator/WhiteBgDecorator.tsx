import { StoryFn } from "@storybook/react";
import styles from "./WhiteBgDecorator.module.scss";

export const WhiteBgDecorator = (StoryComponent: StoryFn) => (
  <div className={styles.wrapper}>
    <StoryComponent />
  </div>
);
