import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { IElevation } from '@entities/types';
import { Text } from '@shared/ui';
import styles from './Main.module.scss';

interface Props {
  className?: string;
  data: IElevation;
}

export const ConfigEngineeringDetails = ({ className, data }: Props) => {
  const { t } = useTranslation('engineering');

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.state}>
        <div className={styles.stateRow}>
          <div className={styles.label}>
            <Text variant="body14" fontWeight="regular">
              {t('details.ip_address')}
            </Text>
          </div>
          <Text variant="body14" fontWeight="medium">
            {data.ip_address}
          </Text>
        </div>
        <div className={styles.stateRow}>
          <div className={styles.label}>
            <Text variant="body14" fontWeight="regular">
              {t('details.registry')}
            </Text>
          </div>
          <Text variant="body14" fontWeight="medium">
            {data.registry_address}
          </Text>
        </div>
      </div>
    </div>
  );
};
