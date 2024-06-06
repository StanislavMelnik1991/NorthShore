import classNames from 'classnames';
import { Badge } from '@shared/ui';
import styles from './Skeleton.module.scss';

interface Props {
  className?: string;
  player: JSX.Element;
  badge?: JSX.Element | Array<JSX.Element | string | undefined | false>;
}

export const VideoSkeleton = ({ className, player, badge }: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      {player}
      {badge && (
        <Badge color="dark" className={styles.timeStamp}>
          {badge}
        </Badge>
      )}
    </div>
  );
};
