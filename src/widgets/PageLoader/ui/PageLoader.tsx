import classNames from 'classnames';
import { Loader } from '@shared/ui';
import styles from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <div className={classNames(styles.PageLoader, className)}>
    <Loader size={140} />
  </div>
);
