import classNames from 'classnames';
import styles from './UserIcon.module.scss';

interface Props {
  className?: string;
  user: { name: string; avatar: string | null };
  onClick?(): void;
}

export const UserIcon = ({ className, user, onClick }: Props) => {
  return user.avatar ? (
    <div
      className={styles.wrapper}
      style={{ background: 'url(' + user.avatar + ')' }}
      onClick={onClick}
    ></div>
  ) : (
    <div className={classNames(styles.wrapper, className)} onClick={onClick}>
      {user.name[0]}
    </div>
  );
};
