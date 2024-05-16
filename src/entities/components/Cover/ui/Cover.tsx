import classNames from 'classnames';
import { IconClose } from '@shared/icons';
import styles from './Cover.module.scss';

interface Props {
  className?: string;
  onRemove?: () => void;
  src?: string;
  aspectRatio?: string | number;
}

export const Cover = ({
  className,
  onRemove,
  src,
  aspectRatio = 307 / 180,
}: Props) => {
  return (
    <div
      className={classNames(styles.wrapper, className)}
      style={{ aspectRatio }}
    >
      <img className={styles.image} src={src} alt="cover" />
      {onRemove && (
        <IconClose
          width={20}
          height={20}
          className={styles.remove}
          onClick={onRemove}
        />
      )}
    </div>
  );
};
