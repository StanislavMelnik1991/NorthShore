import classNames from 'classnames';
import styles from './Dot.module.scss';

interface Props {
  className?: string;
  color?: 'blue' | 'dark' | 'green' | 'orange' | 'red' | 'violet' | 'white';
  size?: number;
}

export const Dot = ({ className, color = 'green', size = 6 }: Props) => {
  return (
    <div
      className={classNames(styles.wrapper, styles[color], className)}
      style={{ width: size, height: size }}
    />
  );
};
