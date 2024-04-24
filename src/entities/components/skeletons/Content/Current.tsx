import classNames from 'classnames';
import { ReactNode } from 'react';
import { Card } from '@shared/ui';
import styles from './Current.module.scss';

interface Props {
  className?: string;
  children?:
    | JSX.Element
    | Array<JSX.Element | string | undefined>
    | string
    | false
    | ReactNode;
  padding?: number;
  radius?: number;
  flexDirection?:
    | 'column'
    | 'column-reverse'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revert-layer'
    | 'row'
    | 'row-reverse';
  gap?: number;
  isLoading?: boolean;
  loaderSize?: number;
  zIndex?: number;
  hideShadow?: boolean;
}

export const CurrentSkeleton = ({
  className,
  isLoading,
  children,
  flexDirection = 'column',
  ...props
}: Props) => {
  return (
    <Card
      className={classNames(styles.wrapper, className)}
      loading={isLoading}
      flexDirection={flexDirection}
      {...props}
    >
      {children}
    </Card>
  );
};
