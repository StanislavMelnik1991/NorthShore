import classNames from 'classnames';
import { Text } from '@shared/ui';
import styles from './Text.module.scss';

interface Props {
  text: string;
  className?: string;
  fontWeight?: 'medium' | 'regular' | 'semibold';
}

export const TableText = ({
  text,
  className,
  fontWeight = 'regular',
}: Props) => {
  return (
    <Text
      className={classNames(styles.wrapper, className)}
      fontWeight={fontWeight}
      variant="body14"
    >
      {text}
    </Text>
  );
};
