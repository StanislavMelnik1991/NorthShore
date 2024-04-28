import classNames from 'classnames';
import { Text } from '@shared/ui';
import styles from './Text.module.scss';

interface Props {
  children: false | string | JSX.Element | Array<string | JSX.Element | false>;
  className?: string;
  fontWeight?: 'medium' | 'regular' | 'semibold';
}

export const TableText = ({
  children,
  className,
  fontWeight = 'regular',
}: Props) => {
  return (
    <Text
      className={classNames(styles.wrapper, className)}
      fontWeight={fontWeight}
      variant="body14"
    >
      {children}
    </Text>
  );
};
