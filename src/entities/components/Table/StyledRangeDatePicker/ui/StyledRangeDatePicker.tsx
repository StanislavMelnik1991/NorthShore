import classNames from 'classnames';
import { RangeDatePicker } from '../../../';
import styles from './StyledRangeDatePicker.module.scss';

interface Props {
  className?: string;
  startDate: Date | null;
  endDate: Date | null;
  onChange: (val: [Date | null, Date | null]) => void;
}

export const StyledRangeDatePicker = ({
  className,
  startDate,
  onChange,
  endDate,
}: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <RangeDatePicker
        borderClassName={styles.picker}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        inline
      />
    </div>
  );
};
