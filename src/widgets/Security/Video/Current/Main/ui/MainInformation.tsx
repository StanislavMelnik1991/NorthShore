import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SecurityCamera } from '@entities/types';
import { IconComment, IconMap, IconPoint } from '@shared/icons';
import { Text } from '@shared/ui';
import styles from './MainInformation.module.scss';

interface Props {
  className?: string;
  data: SecurityCamera;
}

export const MainInformation = ({ className, data }: Props) => {
  const { t } = useTranslation('security');
  const street = data.street.name;
  const home = data.building?.name;
  const entrance = data.entrance?.name;
  const location = `${street ? `${street},` : ''} ${home ? `${home},` : ''} ${entrance ? `${entrance}` : ''}`;
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.row}>
        <div className={classNames(styles.column, styles.label)}>
          <IconMap width={20} height={20} />
          <Text fontWeight="regular" variant="body14">
            {t('camera.point')}
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
      <div className={styles.row}>
        <div className={classNames(styles.column, styles.label)}>
          <IconPoint width={20} height={20} />
          <Text fontWeight="regular" variant="body14">
            {t('camera.location')}
          </Text>
        </div>
        <div className={styles.column}>
          <Text fontWeight="medium" variant="body14">
            {location}
          </Text>
        </div>
      </div>
      <div className={styles.row}>
        <div className={classNames(styles.column, styles.label)}>
          <IconComment width={20} height={20} />
          <Text fontWeight="regular" variant="body14">
            {t('camera.comment')}
          </Text>
        </div>
        <div className={styles.column}>
          <Text fontWeight="medium" variant="body14">
            {data.comment}
          </Text>
        </div>
      </div>
    </div>
  );
};
