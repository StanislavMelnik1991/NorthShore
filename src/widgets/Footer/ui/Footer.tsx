import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  IconLogoRu,
  IconMail,
  IconPhone,
  IconTelegram,
  // IconViber,
} from '@shared/icons';
import { Button, Divider, Text, Title } from '@shared/ui';
import styles from './Footer.module.scss';

interface Props {
  className?: string;
}

export const Footer = ({ className }: Props) => {
  const { t } = useTranslation();
  return (
    <footer className={classNames(styles.wrapper, className)}>
      <div className={styles.content}>
        <IconLogoRu width={190} />
        <div className={styles.column}>
          <Title variant="h4" fontWeight="normal">
            {t('footer.northWaterfront')}
          </Title>
          <Link
            to={
              'https://yandex.by/maps/157/minsk/house/Zk4YcwJmTkcHQFtpfXR4cn9qZg==/?ll=27.556720%2C53.893392&z=17'
            }
            target="_blank"
          >
            <Text variant="body14" fontWeight="regular">
              {t('footer.actualAddress')}
            </Text>
          </Link>
          <Link
            to={
              'https://yandex.by/maps/157/minsk/house/Zk4YcwFmTkwOQFtpfXV3c39lYg==/?ll=27.566799%2C53.962366&z=17.14'
            }
            target="_blank"
          >
            <Text variant="body14" fontWeight="regular">
              {t('footer.legalAddress')}
            </Text>
          </Link>
          <Link
            to={'https://northwaterfront.by/'}
            target="_blank"
            className={styles.link}
          >
            {t('footer.advertisement')}
          </Link>
        </div>
        <div className={styles.column}>
          <div className={styles.contacts}>
            <IconPhone
              theme="dark"
              className={styles.icon}
              width={24}
              height={24}
            />
            <div className={styles.phone}>
              <a href={'tel:+375173116888'}>
                <Text>{'+375 17 311-68-88'}</Text>
              </a>
              <a href={'tel:88011003888'}>
                <Text>{'8 801 100-38-88'}</Text>
              </a>
            </div>
          </div>
          <div className={styles.contacts}>
            <IconMail className={styles.icon} width={24} height={24} />
            <a href={'mailto:info@northwaterfront.by'}>
              <Text>{'info@northwaterfront.by'}</Text>
            </a>
          </div>
        </div>
        <div className={styles.socials}>
          <Link to={'https://t.me/nw_northwaterfront'} target="_blank">
            <Button className={styles.button} variant="light">
              <IconTelegram className={styles.icon} width={24} height={24} />
            </Button>
          </Link>
          {/* <Link to={''} target="_blank">
            <Button className={styles.button} variant="light">
              <IconViber className={styles.icon} width={24} height={24} />
            </Button>
          </Link> */}
        </div>
      </div>
      <Divider className={styles.divider} />
      <div className={styles.footer}>
        <Text variant="body14" fontWeight="regular">
          {'© 2024 North Waterfront'}
        </Text>
      </div>
    </footer>
  );
};
