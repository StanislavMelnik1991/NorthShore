import classNames from 'classnames';
import styles from './MainInformation.module.scss';

interface Props {
  className?: string;
}

export const MainInformation = ({ className }: Props) => {
  return <div className={classNames(styles.wrapper, className)}></div>;
};
