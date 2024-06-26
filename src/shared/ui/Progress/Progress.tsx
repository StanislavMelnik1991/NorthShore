import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import styles from './Progress.module.scss';

interface Props {
  label?: string;
  wrapperClassName?: string;
  barClassName?: string;
  progressClassName?: string;
  percent: number;
  onLabelClick?: MouseEventHandler<HTMLParagraphElement>;
}

export const Progress = ({
  wrapperClassName,
  barClassName,
  progressClassName,
  label,
  percent,
  onLabelClick,
}: Props) => {
  return (
    <label className={classNames(styles.wrapper, wrapperClassName)}>
      {label && (
        <p
          onClick={onLabelClick}
          className={classNames(styles.label, {
            [styles.clickable]: onLabelClick,
          })}
        >
          {label}
        </p>
      )}
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
