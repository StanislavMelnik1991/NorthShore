import classNames from 'classnames';
import { Button, Text } from '@shared/ui';
import { useUserDeleting } from '../hook';
import styles from './Deleting.module.scss';

interface Props {
  className?: string;
}

export const UserDeleting = ({ className }: Props) => {
  const { t } = useUserDeleting();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.label}>
        <Text variant="body14" fontWeight="regular" className={styles.dark}>
          {t('blocks.deleting.label')}
        </Text>
        <Text variant="body16" fontWeight="regular">
          {t('blocks.deleting.placeholder')}
        </Text>
      </div>
      <Button disabled variant="danger">
        {t('blocks.btns.delete')}
      </Button>
    </div>
  );
};
