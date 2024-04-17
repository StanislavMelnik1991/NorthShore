/* eslint-disable @conarti/feature-sliced/layers-slices */
import { StoryFn } from '@storybook/react';
import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';
import styles from './StylesDecorator.module.scss';
import '@app/styles/index.scss';

export const StylesDecorator = (StoryComponent: StoryFn) => (
  <div className={classNames('app', styles.wrapper)}>
    <ToastContainer />
    <StoryComponent />
  </div>
);
