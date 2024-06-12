import classNames from 'classnames';
import { useTab } from '../hook';
import styles from './Tab.module.scss';

interface Props {
  className?: string;
  labels: Array<string | JSX.Element>;
  tabs: Array<string | JSX.Element>;
  selected?: number;
  disabled?: Array<boolean>;
}

export const Tab = ({
  className,
  labels,
  tabs,
  selected,
  disabled = [],
}: Props) => {
  const { active, setActive } = useTab({ selected });
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.labels}>
        {labels.map((el, index) => {
          return (
            <button
              className={classNames(styles.label, {
                [styles.active]: active === index,
              })}
              disabled={disabled[index]}
              key={`tab-label-${index}`}
              onClick={() => {
                setActive(index);
              }}
            >
              {el}
            </button>
          );
        })}
      </div>
      <div className={styles.tabs}>{tabs[active]}</div>
    </div>
  );
};
