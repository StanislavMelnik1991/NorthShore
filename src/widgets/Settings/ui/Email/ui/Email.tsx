import classNames from 'classnames';
import { Button, Text } from '@shared/ui';
import { useUserEmail } from '../hook';
import styles from './Email.module.scss';

interface Props {
  className?: string;
}

export const UserEmail = ({ className }: Props) => {
  const { t, user } = useUserEmail();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.label}>
        <Text variant="body14" fontWeight="regular" className={styles.dark}>
          {t('blocks.email.label')}
        </Text>
        <Text variant="body16" fontWeight="regular">
          {user?.email || '-'}
        </Text>
      </div>
      <Button disabled variant="light">
        {t('blocks.btns.edit')}
      </Button>
    </div>
  );
};
