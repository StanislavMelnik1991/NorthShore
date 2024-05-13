import classNames from 'classnames';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { IconCalendar, IconClock } from '@shared/icons';
import { Text } from '@shared/ui';
import styles from './Details.module.scss';

interface Props {
  className?: string;
  date: Date;
  showLabels?: boolean;
}

export const DateDetails = ({ className, date, showLabels = true }: Props) => {
  const { t } = useTranslation('content');
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.dateCard}>
        {showLabels && (
          <Text className={styles.label} variant="body14" fontWeight="regular">
            {t('date')}
          </Text>
        )}
        <Text variant="body14" fontWeight="semibold">
          <IconCalendar className={styles.icon} width={20} height={20} />
          {format(date, 'dd.MM.yyyy')}
        </Text>
      </div>
      <div className={styles.dateCard}>
        {showLabels && (
          <Text className={styles.label} variant="body14" fontWeight="regular">
            {t('time')}
          </Text>
        )}
        <Text variant="body14" fontWeight="semibold">
          <IconClock className={styles.icon} width={20} height={20} />
          {format(date, 'HH:mm')}
        </Text>
      </div>
    </div>
  );
};
