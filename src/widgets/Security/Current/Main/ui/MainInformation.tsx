import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { formatAddress } from '@features/utils';
import { IApartment, IBuilding, IEntrance, IStreet } from '@entities/types';
import {
  IconComment,
  IconKey,
  IconLock,
  IconMap,
  IconPoint,
  IconWifi,
} from '@shared/icons';
import { Text } from '@shared/ui';
import styles from './MainInformation.module.scss';

interface Props {
  className?: string;
  data: {
    street?: IStreet;
    building?: IBuilding;
    entrance?: IEntrance;
    apartment?: IApartment;
    lon?: number;
    lat?: number;
    name?: string;
    type?: { name: string };
    status?: { name: string };
    uuid?: string;
  };
}

export const MainInformation = ({ className, data }: Props) => {
  const { t } = useTranslation('security');
  const location = formatAddress(data);

  return (
    <div className={classNames(styles.wrapper, className)}>
      {data.type && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <IconWifi width={20} height={20} />
            <Text fontWeight="regular" variant="body14">
              {t('details.type')}
            </Text>
          </div>
          <div className={styles.column}>
            <Text fontWeight="medium" variant="body14">
              {data.type.name}
            </Text>
          </div>
        </div>
      )}
      {data.lat && data.lon && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <IconMap width={20} height={20} />
            <Text fontWeight="regular" variant="body14">
              {t('details.point')}
            </Text>
          </div>
          <div className={styles.column}>
            <Link
              to={`https://yandex.ru/maps/?ll=${data.lon}%2C${data.lat}&z=17&pt=${data.lon}%2C${data.lat}`}
              target="_blank"
            >
              <Text fontWeight="medium" variant="body14">
                {`${data.lat}, ${data.lon}`}
              </Text>
            </Link>
          </div>
        </div>
      )}
      <div className={styles.row}>
        <div className={classNames(styles.column, styles.label)}>
          <IconPoint width={20} height={20} />
          <Text fontWeight="regular" variant="body14">
            {t('details.location')}
          </Text>
        </div>
        <div className={styles.column}>
          <Text fontWeight="medium" variant="body14">
            {location}
          </Text>
        </div>
      </div>
      {data.name && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <IconComment width={20} height={20} />
            <Text fontWeight="regular" variant="body14">
              {t('details.comment')}
            </Text>
          </div>
          <div className={styles.column}>
            <Text fontWeight="medium" variant="body14">
              {data.name}
            </Text>
          </div>
        </div>
      )}
      {data.status && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <IconLock width={20} height={20} />
            <Text fontWeight="regular" variant="body14">
              {t('details.status')}
            </Text>
          </div>
          <div className={styles.column}>
            <Text fontWeight="medium" variant="body14">
              {data.status.name}
            </Text>
          </div>
        </div>
      )}
      {data.uuid && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <IconKey width={20} height={20} />
            <Text fontWeight="regular" variant="body14">
              {t('details.uuid')}
            </Text>
          </div>
          <div className={styles.column}>
            <Text fontWeight="medium" variant="body14">
              {data.uuid}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};
