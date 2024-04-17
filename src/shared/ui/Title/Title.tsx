import classNames from 'classnames';
import styles from './Title.module.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  variant?: 'h1' | 'h2' | 'h3' | 'h4';
  fontWeight?: 'bold' | 'normal' | 'semibold';
}

export const Title = ({
  className,
  variant = 'h3',
  fontWeight = 'normal',
  ...props
}: Props) => {
  switch (variant) {
    case 'h1':
      return (
        <h1
          className={classNames(
            styles.wrapper,
            styles[fontWeight],
            styles[variant],
            className,
          )}
          {...props}
        />
      );
    case 'h2':
      return (
        <h2
          className={classNames(
            styles.wrapper,
            styles[fontWeight],
            styles[variant],
            className,
          )}
          {...props}
        />
      );
    case 'h3':
      return (
        <h3
          className={classNames(
            styles.wrapper,
            styles[fontWeight],
            styles[variant],
            className,
          )}
          {...props}
        />
      );
    case 'h4':
      return (
        <h4
          className={classNames(
            styles.wrapper,
            styles[fontWeight],
            styles[variant],
            className,
          )}
          {...props}
        />
      );

    default:
      return (
        <h4
          className={classNames(
            styles.wrapper,
            styles[fontWeight],
            styles[variant],
            className,
          )}
          {...props}
        />
      );
  }
};
