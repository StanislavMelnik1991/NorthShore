import classNames from 'classnames';
import styles from './Badge.module.scss';

interface Props {
  className?: string;
  children?:
    | JSX.Element
    | string
    | Array<JSX.Element | string | false | undefined>;
  color?: 'blue' | 'dark' | 'green' | 'orange' | 'red' | 'violet' | 'white';
}

export const Badge = ({ className, children, color = 'green' }: Props) => {
  return (
    <div className={classNames(styles.wrapper, styles[color], className)}>
      {children}
    </div>
  );
};
