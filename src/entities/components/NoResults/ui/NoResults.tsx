import classNames from 'classnames';
import { Text } from '@shared/ui';
import cover from '../assets/image.png';
import styles from './NoResults.module.scss';

interface Props {
  className?: string;
  title?: string;
  text?: string;
}

export const NoResults = ({ className, text, title }: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.text}>
        <Text variant="body14" fontWeight="semibold">
          {title}
        </Text>
        <Text className={styles.gray} variant="body14" fontWeight="regular">
          {text}
        </Text>
      </div>
      <img className={styles.image} src={cover} />
    </div>
  );
};
