import classNames from 'classnames';
import { IconFilter } from '@shared/icons';
import { Text } from '@shared/ui';
import { useFiler } from '../hook';
import styles from './Filter.module.scss';

interface Props {
  className?: string;
  label: string;
  filter: JSX.Element;
  isActive?: boolean;
  disabled?: boolean;
  popupPosition?: {
    left?: number | string;
    right?: number | string;
  };
}

export const TableFilter = ({
  className,
  label,
  filter,
  isActive,
  disabled,
  popupPosition = {
    left: 0,
  },
}: Props) => {
  const { isFilterShow, toggleShowFilter, wrapperRef } = useFiler({ isActive });
  return (
    <div
      ref={wrapperRef}
      className={classNames(
        styles.wrapper,
        { [styles.active]: isActive },
        { [styles.disabled]: disabled },
        className,
      )}
    >
      <div className={styles.content}>
        <Text
          fontWeight="regular"
          variant="body14"
          onClick={disabled ? undefined : toggleShowFilter}
          className={classNames(styles.label)}
        >
          {label}
        </Text>
        {!disabled && (
          <IconFilter className={styles.icon} width={16} height={16} />
        )}
      </div>
      <div
        style={{ left: popupPosition.left, right: popupPosition.right }}
        className={classNames(styles.filter, { [styles.show]: isFilterShow })}
      >
        {filter}
      </div>
    </div>
  );
};
