import classNames from 'classnames';
import { Card } from '@shared/ui';
import styles from './Current.module.scss';

interface Props {
  className?: string;
  isLoading?: boolean;
  children?:
    | JSX.Element
    | Array<JSX.Element | string | undefined | false>
    | string
    | false;
}

export const CurrentSkeleton = ({ className, isLoading, children }: Props) => {
  return (
    <Card
      className={classNames(styles.wrapper, className)}
      loading={isLoading}
      flexDirection="column"
    >
      {children}
    </Card>
  );
};
