import { StoryFn } from '@storybook/react';
import { Card } from '../../../ui';
import styles from './WhiteBgDecorator.module.scss';

export const WhiteBgDecorator = (StoryComponent: StoryFn) => (
  <Card radius={0} padding={20} className={styles.wrapper}>
    <StoryComponent />
  </Card>
);
