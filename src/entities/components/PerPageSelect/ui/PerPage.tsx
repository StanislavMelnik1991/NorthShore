import classNames from 'classnames';
import { Text } from '@shared/ui';
import { perPageVariants } from '../config';
import styles from './PerPage.module.scss';

interface Props {
  className?: string;
  active: number;
  setActive(val: number): void;
}

export const PerPage = ({ className, active, setActive }: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      {perPageVariants.map((el) => {
        return (
          <div
            onClick={() => setActive(el)}
            className={classNames(styles.element, {
              [styles.active]: el === active,
            })}
            key={`per-page-${el}`}
          >
            <Text variant="body14">{el}</Text>
          </div>
        );
      })}
    </div>
  );
};
