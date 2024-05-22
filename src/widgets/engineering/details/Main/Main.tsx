import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { formatAddress } from '@features/utils';
import { IElevation } from '@entities/types';
import { IconInfo, IconPoint, IconWrench } from '@shared/icons';
import { Dot, Text } from '@shared/ui';
import styles from './Main.module.scss';

interface Props {
  className?: string;
  data: IElevation;
}

export const MainEngineeringDetails = ({ className, data }: Props) => {
  const { t } = useTranslation('engineering');
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.state}>
        <div className={styles.stateRow}>
          <div className={styles.label}>
            <IconPoint width={20} height={20} />
            <Text variant="body14" fontWeight="regular">
              {t('details.address')}
            </Text>
          </div>
          <Text variant="body14" fontWeight="medium">
            {formatAddress(data.entrance || {})}
          </Text>
        </div>
        <div className={styles.stateRow}>
          <div className={styles.label}>
            <IconWrench width={20} height={20} />
            <Text variant="body14" fontWeight="regular">
              {t('details.state')}
            </Text>
          </div>
          <Text
            variant="body14"
            fontWeight="medium"
            className={classNames({
              [styles.green]: !data.alarms?.length,
              [styles.red]: data.alarms?.length,
            })}
          >
            <Dot color={data.alarms?.length ? 'red' : 'green'} />
            {data.alarms?.length ? t(`state.faulty`) : t(`state.serviceable`)}
          </Text>
        </div>
      </div>
      <div className={styles.errors}>
        {data.alarms?.map((el, index) => {
          return (
            <div key={`card-error-${index}`} className={styles.errorContent}>
              <Text variant="body14" fontWeight="regular">
                {el}
              </Text>
              <IconInfo width={20} height={20} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
