import classNames from 'classnames';
import { UserIcon } from '@entities/components';
import { IconBasket } from '@shared/icons';
import { Button, Text } from '@shared/ui';
import { useAvatar } from '../hook';
import styles from './Avatar.module.scss';

interface Props {
  className?: string;
}

export const Avatar = ({ className }: Props) => {
  const { t, user, getInputProps, open, handleRemove } = useAvatar();
  if (!user) {
    return <></>;
  }
  return (
    <div className={classNames(styles.wrapper, className)}>
      <input {...getInputProps()} />
      <UserIcon user={user} className={styles.image} />
      <div className={styles.controls}>
        <Text>{t('blocks.titles.profile_photo')}</Text>
        <div className={styles.buttons}>
          <Button onClick={open} variant="light">
            {t('blocks.btns.edit')}
          </Button>
          <Button onClick={handleRemove} variant="danger">
            <IconBasket width={20} height={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};
