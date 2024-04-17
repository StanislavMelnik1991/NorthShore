import classNames from 'classnames';
import styles from './Text.module.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  variant?: 'body16' | 'body14' | 'body13' | 'small';
  fontWeight?: 'medium' | 'regular' | 'semibold';
}

export const Text = ({
  className,
  variant = 'body14',
  fontWeight = 'regular',
  ...props
}: Props) => {
  return (
    <p
      className={classNames(
        styles.wrapper,
        styles[fontWeight],
        styles[variant],
        className,
      )}
      {...props}
    />
  );
};
