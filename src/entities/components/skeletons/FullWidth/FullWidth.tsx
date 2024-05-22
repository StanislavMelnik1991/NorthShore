import classNames from 'classnames';
import { IconClose } from '@shared/icons';
import { Button } from '@shared/ui';
import styles from './FullWidth.module.scss';
import { useFullWidthSkeleton } from './hook';

interface Props {
  className?: string;
  children?:
    | JSX.Element
    | string
    | Array<JSX.Element | string | undefined | null | JSX.Element[] | false>;
}

export const FullWidthSkeleton = ({ className, children }: Props) => {
  const { handleClose } = useFullWidthSkeleton();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Button variant="white" className={styles.close} onClick={handleClose}>
        <IconClose width={20} height={20} />
      </Button>
      {children}
    </div>
  );
};
