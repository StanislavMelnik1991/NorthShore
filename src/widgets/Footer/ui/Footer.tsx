import classNames from 'classnames';
import { IconLogo } from '@shared/icons';
import styles from './Footer.module.scss';

interface Props {
  className?: string;
}

export const Footer = ({ className }: Props) => {
  return (
    <footer className={classNames(styles.wrapper, className)}>
      <IconLogo theme="light" height={30} />
    </footer>
  );
};
