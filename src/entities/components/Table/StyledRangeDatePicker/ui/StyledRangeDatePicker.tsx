import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button, Divider } from '@shared/ui';
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
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <RangeDatePicker
        borderClassName={styles.picker}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        inline
      />
      <Divider />
      <Button
        className={styles.reset}
        disabled={!startDate && !endDate}
        onClick={() => onChange([null, null])}
        variant="text"
      >
        {t('actions.reset')}
      </Button>
    </div>
  );
};
