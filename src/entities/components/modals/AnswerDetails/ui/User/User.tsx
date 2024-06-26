import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Text } from '@shared/ui';
import { UserIcon } from '../../../../';
import styles from './User.module.scss';

interface Props {
  className?: string;
  user: {
    id: number | string;
    name: string;
    avatar?: string;
    group: { name: string };
  };
}

export const AnswerDetailsUser = ({
  className,
  user: { group, id, name, avatar },
}: Props) => {
  return (
    <Link
      className={classNames(styles.wrapper, className)}
      to={AppRoutes[AppRoutesEnum.RESIDENTS_CURRENT](id)}
    >
      <UserIcon user={{ name, avatar }} />
      <div className={styles.text}>
        <Text variant="body16" fontWeight="semibold">
          {name}
        </Text>
        <Text variant="body16" fontWeight="regular">
          {group.name}
        </Text>
      </div>
    </Link>
  );
};
