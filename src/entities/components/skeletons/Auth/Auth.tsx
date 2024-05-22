import classNames from 'classnames';
import image from './assets/preview.jpg';
import styles from './Auth.module.scss';

interface Props {
  className?: string;
  children?:
    | JSX.Element
    | string
    | Array<JSX.Element | string | undefined | null | JSX.Element[] | false>;
}

export const AuthSkeleton = ({ className, children }: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={'auth'} className={styles.image} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
