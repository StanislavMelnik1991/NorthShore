import classNames from 'classnames';
import { Button, Dot, Text } from '@shared/ui';
import { useUserPassword } from '../hook';
import styles from './Password.module.scss';

interface Props {
  className?: string;
}

export const UserPassword = ({ className }: Props) => {
  const { t } = useUserPassword();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.label}>
        <Text variant="body14" fontWeight="regular" className={styles.dark}>
          {t('blocks.password.label')}
        </Text>
        <div className={styles.dots}>
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
        </div>
      </div>
      <Button disabled variant="light">
        {t('blocks.btns.edit')}
      </Button>
    </div>
  );
};
