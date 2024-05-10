import classNames from 'classnames';
import styles from './Progress.module.scss';

interface Props {
  label?: string;
  wrapperClassName?: string;
  barClassName?: string;
  progressClassName?: string;
  percent: number;
}

export const Progress = ({
  wrapperClassName,
  barClassName,
  progressClassName,
  label,
  percent,
}: Props) => {
  return (
    <label className={classNames(styles.wrapper, wrapperClassName)}>
      {label && <p className={classNames(styles.label)}>{label}</p>}
      <div className={classNames(styles.bar, barClassName)}>
        <div
          className={classNames(styles.progress, progressClassName)}
          style={{ width: `${percent}%` }}
        >
          {`${percent} %`}
        </div>
      </div>
    </label>
  );
};
