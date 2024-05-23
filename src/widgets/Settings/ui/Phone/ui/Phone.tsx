import classNames from 'classnames';
import { Button, Text } from '@shared/ui';
import { useUserPhone } from '../hook';
import styles from './Phone.module.scss';

interface Props {
  className?: string;
}

export const UserPhone = ({ className }: Props) => {
  const { t, user } = useUserPhone();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.label}>
        <Text variant="body14" fontWeight="regular" className={styles.dark}>
          {t('blocks.phone.label')}
        </Text>
        <Text variant="body16" fontWeight="regular">
          {user?.phone_number || '-'}
        </Text>
      </div>
      <Button disabled variant="light">
        {t('blocks.btns.edit')}
      </Button>
    </div>
  );
};
