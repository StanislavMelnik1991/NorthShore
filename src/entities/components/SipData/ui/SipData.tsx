import classNames from 'classnames';
import { Text } from '@shared/ui';
import { useSipData } from '../hook';
import styles from './SipData.module.scss';

interface Props {
  className?: string;
  password?: string;
  ip_address?: string;
  port?: string | number;
}

export const SipData = ({ className, port, ip_address, password }: Props) => {
  const { t, copyText } = useSipData();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.row}>
        <div className={styles.content} onClick={copyText(password)}>
          <Text fontWeight="regular" variant="small">
            {t('editor.password.label')}
          </Text>
          <Text fontWeight="medium" variant="small">
            {password}
          </Text>
        </div>
        <div className={styles.content} onClick={copyText(ip_address)}>
          <Text fontWeight="regular" variant="small">
            {t('editor.sipAddress')}
          </Text>
          <Text fontWeight="medium" variant="small">
            {ip_address}
          </Text>
        </div>
      </div>
      <div className={styles.content} onClick={copyText(port)}>
        <Text fontWeight="regular" variant="small">
          {t('editor.sipPort')}
        </Text>
        <Text fontWeight="medium" variant="small">
          {port}
        </Text>
      </div>
    </div>
  );
};
