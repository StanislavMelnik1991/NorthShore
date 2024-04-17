import classNames from 'classnames';
import styles from './UserIcon.module.scss';

interface Props {
  className?: string;
  userName: string;
  onClick?(): void;
}

export const UserIcon = ({ className, userName, onClick }: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)} onClick={onClick}>
      {userName[0]}
    </div>
  );
};
