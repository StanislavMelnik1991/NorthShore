import classNames from 'classnames';
import styles from './List.module.scss';

interface Props {
  className?: string;
}

export const RequestList = ({ className }: Props) => {
  return <div className={classNames(styles.wrapper, className)}></div>;
};
