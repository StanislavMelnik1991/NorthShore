import classNames from 'classnames';
import { Text, Title } from '@shared/ui';
import { useVideoConfig } from '../hook';
import styles from './Config.module.scss';

interface Props {
  className?: string;
  data: {
    rtsp_url?: string;
    rtsp_url_small?: string;
    ip_address?: string;
    http_login?: string;
    http_password?: string;
    login?: string;
    password?: string;
  };
}

export const ConfigInformation = ({ className, data }: Props) => {
  const { t, copyText } = useVideoConfig();

  return (
    <div className={classNames(styles.wrapper, className)}>
      {data.ip_address && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <Text fontWeight="regular" variant="body14">
              {t('details.ipAddress')}
            </Text>
          </div>
          <div className={styles.column}>
            <Text
              fontWeight="medium"
              variant="body14"
              onClick={copyText(data.ip_address)}
            >
              {data.ip_address}
            </Text>
          </div>
        </div>
      )}
      {(data.login || data.password) && (
        <Title className={styles.title} variant="h4" fontWeight="semibold">
          {t('editor.webData')}
        </Title>
      )}
      {data.login && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <Text fontWeight="regular" variant="body14">
              {t('details.login')}
            </Text>
          </div>
          <div className={styles.column}>
            <Text
              fontWeight="medium"
              variant="body14"
              onClick={copyText(data.login)}
            >
              {data.login}
            </Text>
          </div>
        </div>
      )}
      {data.password && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <Text fontWeight="regular" variant="body14">
              {t('details.password')}
            </Text>
          </div>
          <div className={styles.column}>
            <Text
              fontWeight="medium"
              variant="body14"
              onClick={copyText(data.password)}
            >
              {data.password}
            </Text>
          </div>
        </div>
      )}
      {(data.http_login || data.http_password) && (
        <Title className={styles.title} variant="h4" fontWeight="semibold">
          {t('editor.httpData')}
        </Title>
      )}
      {data.http_login && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <Text fontWeight="regular" variant="body14">
              {t('details.login')}
            </Text>
          </div>
          <div className={styles.column}>
            <Text
              fontWeight="medium"
              variant="body14"
              onClick={copyText(data.http_login)}
            >
              {data.http_login}
            </Text>
          </div>
        </div>
      )}
      {data.http_password && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <Text fontWeight="regular" variant="body14">
              {t('details.password')}
            </Text>
          </div>
          <div className={styles.column}>
            <Text
              fontWeight="medium"
              variant="body14"
              onClick={copyText(data.http_password)}
            >
              {data.http_password}
            </Text>
          </div>
        </div>
      )}
      {data.rtsp_url && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <Text fontWeight="regular" variant="body14">
              {t('details.highQuality')}
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
      )}
      {data.rtsp_url_small && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <Text fontWeight="regular" variant="body14">
              {t('details.lowQuality')}
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
      )}
    </div>
  );
};
