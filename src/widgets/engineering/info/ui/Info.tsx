import classNames from 'classnames';
import { Card } from '@shared/ui';
import styles from './Info.module.scss';

interface Props {
  className?: string;
}

export const Info = ({ className }: Props) => {
  return (
    <Card className={classNames(styles.wrapper, className)}>
      <div className={styles.data}></div>
      <div className={styles.data}></div>
    </Card>
  );
};
