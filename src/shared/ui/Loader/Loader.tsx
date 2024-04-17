import classNames from 'classnames';
import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
  size?: number | string;
}

export const Loader = ({ className, size = 80 }: LoaderProps) => (
  <div
    className={classNames(styles.wrapper, className)}
    style={{ width: size, height: size }}
  >
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
