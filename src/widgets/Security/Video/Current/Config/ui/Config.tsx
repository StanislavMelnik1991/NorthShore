import classNames from 'classnames';
import { SecurityCamera } from '@entities/types';
import { Text } from '@shared/ui';
import { useVideoConfig } from '../hook';
import styles from './Config.module.scss';

interface Props {
  className?: string;
  data: SecurityCamera;
}

export const ConfigInformation = ({ className, data }: Props) => {
  const { t, copyText } = useVideoConfig();

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.row}>
        <div className={classNames(styles.column, styles.label)}>
          <Text fontWeight="regular" variant="body14">
            {t('camera.highQuality')}
          </Text>
        </div>
        <div className={styles.column}>
          <Text
            fontWeight="medium"
            variant="body14"
            onClick={copyText(data.rtsp_url)}
          >
            {data.rtsp_url}
          </Text>
        </div>
      </div>
      <div className={styles.row}>
        <div className={classNames(styles.column, styles.label)}>
          <Text fontWeight="regular" variant="body14">
            {t('camera.lowQuality')}
          </Text>
        </div>
        <div className={styles.column}>
          <Text
            fontWeight="medium"
            variant="body14"
            onClick={copyText(data.rtsp_url_small)}
          >
            {data.rtsp_url_small}
          </Text>
        </div>
      </div>
    </div>
  );
};
