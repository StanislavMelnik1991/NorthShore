import classNames from 'classnames';
import { SecuritySipAccount } from '@entities/types';
import { Text, Title } from '@shared/ui';
import { useVideoConfig } from '../hook';
import styles from './Config.module.scss';

interface Props {
  className?: string;
  data: {
    rtsp_url?: string;
    hls_url?: string;
    ip_address?: string;
    http_login?: string;
    http_password?: string;
    login?: string;
    password?: string;
    type?: { name: string };
    sip_account?: SecuritySipAccount;
  };
}

export const IntercomConfigInformation = ({ className, data }: Props) => {
  const { t, copyText } = useVideoConfig();

  return (
    <div className={classNames(styles.wrapper, className)}>
      {data.type && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <Text fontWeight="regular" variant="body14">
              {t('details.intercomType')}
            </Text>
          </div>
          <div className={styles.column}>
            <Text
              fontWeight="medium"
              variant="body14"
              onClick={copyText(data.type.name)}
            >
              {data.type.name}
            </Text>
          </div>
        </div>
      )}
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
      {data.rtsp_url && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <Text fontWeight="regular" variant="body14">
              {t('details.rtsp_url')}
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
      {data.hls_url && (
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.label)}>
            <Text fontWeight="regular" variant="body14">
              {t('details.hls_url')}
            </Text>
          </div>
          <div className={styles.column}>
            <Text
              fontWeight="medium"
              variant="body14"
              onClick={copyText(data.hls_url)}
            >
              {data.hls_url}
            </Text>
          </div>
        </div>
      )}
      {data.sip_account && (
        <>
          <div className={styles.row}>
            <div className={classNames(styles.column, styles.label)}>
              <Text fontWeight="regular" variant="body14">
                {t('details.phoneNumber')}
              </Text>
            </div>
            <div className={styles.column}>
              <Text
                fontWeight="medium"
                variant="body14"
                onClick={copyText(data.sip_account.phone)}
              >
                {data.sip_account.phone}
              </Text>
            </div>
          </div>
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
                onClick={copyText(data.sip_account.password)}
              >
                {data.sip_account.password}
              </Text>
            </div>
          </div>
          <div className={styles.row}>
            <div className={classNames(styles.column, styles.label)}>
              <Text fontWeight="regular" variant="body14">
                {t('details.sipIp')}
              </Text>
            </div>
            <div className={styles.column}>
              <Text
                fontWeight="medium"
                variant="body14"
                onClick={copyText(data.sip_account.sip_server.ip_address)}
              >
                {data.sip_account.sip_server.ip_address}
              </Text>
            </div>
          </div>
          <div className={styles.row}>
            <div className={classNames(styles.column, styles.label)}>
              <Text fontWeight="regular" variant="body14">
                {t('details.sipPort')}
              </Text>
            </div>
            <div className={styles.column}>
              <Text
                fontWeight="medium"
                variant="body14"
                onClick={copyText(data.sip_account.sip_server.port)}
              >
                {data.sip_account.sip_server.port}
              </Text>
            </div>
          </div>
        </>
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
    </div>
  );
};
