import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconChain } from '@shared/icons';
import { Text } from '@shared/ui';
import styles from './Details.module.scss';

interface Props {
  className?: string;
  href: string;
}

export const LinkDetails = ({ className, href }: Props) => {
  const { t } = useTranslation('content');
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Text className={styles.label} variant="body14" fontWeight="regular">
        {t('link')}
      </Text>
      <Link className={styles.link} to={href}>
        <IconChain width={20} height={20} />
        {href}
      </Link>
    </div>
  );
};
