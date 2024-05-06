import classNames from 'classnames';
import { CurrentSkeleton } from '@entities/components';
import {
  IconBattery,
  IconLightning,
  IconPoint,
  IconWrench,
} from '@shared/icons';
import { Text } from '@shared/ui';
import { useInfo } from '../hook';
import styles from './Info.module.scss';

interface Props {
  className?: string;
  location?: string;
  operating_mode?: string;
  voltage?: string;
  charge_status?: string;
  isLoading?: boolean;
}

export const EngineeringInfo = ({
  className,
  charge_status,
  location,
  operating_mode,
  voltage,
  isLoading,
}: Props) => {
  const { t } = useInfo();

  return (
    <CurrentSkeleton
      isLoading={isLoading}
      className={classNames(styles.wrapper, className)}
      flexDirection="row"
    >
      <div className={styles.group}>
        {location && (
          <div className={styles.data}>
            <div className={styles.label}>
              <IconPoint width={20} height={20} />
              <Text variant="body14" fontWeight="regular">
                {t('header.address')}
              </Text>
            </div>
            <Text variant="body14" fontWeight="medium">
              {location}
            </Text>
          </div>
        )}
        {operating_mode && (
          <div className={styles.data}>
            <div className={styles.label}>
              <IconWrench width={20} height={20} />
              <Text variant="body14" fontWeight="regular">
                {t('header.state')}
              </Text>
            </div>
            <Text variant="body14" fontWeight="medium">
              {operating_mode}
            </Text>
          </div>
        )}
      </div>
      <div className={styles.group}>
        {voltage && (
          <div className={styles.data}>
            <div className={styles.label}>
              <IconLightning width={20} height={20} />
              <Text variant="body14" fontWeight="regular">
                {t('header.voltage')}
              </Text>
            </div>
            <Text variant="body14" fontWeight="medium">
              {voltage}
            </Text>
          </div>
        )}
        {charge_status && (
          <div className={styles.data}>
            <div className={styles.label}>
              <IconBattery width={20} height={20} />
              <Text variant="body14" fontWeight="regular">
                {t('header.chargingStatus')}
              </Text>
            </div>
            <Text variant="body14" fontWeight="medium">
              {charge_status}
            </Text>
          </div>
        )}
      </div>
    </CurrentSkeleton>
  );
};
