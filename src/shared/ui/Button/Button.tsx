import classNames from 'classnames';
import { Loader } from '../Loader';
import styles from './Button.module.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'primary' | 'secondary' | 'danger' | 'light' | 'white';
  size?: 'small' | 'large';
  width?: string | number;
  height?: string | number;
  loading?: boolean;
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'small',
  style,
  width,
  height,
  loading = false,
  children,
  ...props
}: Props) => {
  return (
    <button
      className={classNames(
        styles.wrapper,
        styles[size],
        styles[variant],
        { [styles.loading]: loading },
        className,
      )}
      style={{ width, height, ...style }}
      {...props}
    >
      <Loader
        className={classNames(styles.loader, { [styles.show]: loading })}
        size={24}
      />
      {children}
    </button>
  );
};
