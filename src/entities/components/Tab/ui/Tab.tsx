import classNames from 'classnames';
import { useTab } from '../hook';
import styles from './Tab.module.scss';

interface Props {
  className?: string;
  labels: Array<string | JSX.Element>;
  tabs: Array<string | JSX.Element>;
  selected?: number;
}

export const Tab = ({ className, labels, tabs, selected }: Props) => {
  const { active, setActive } = useTab({ selected });
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.labels}>
        {labels.map((el, index) => {
          return (
            <div
              className={classNames(styles.label, {
                [styles.active]: active === index,
              })}
              key={`tab-label-${index}`}
              onClick={() => {
                setActive(index);
              }}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className={styles.tabs}>{tabs[active]}</div>
    </div>
  );
};
