import classNames from 'classnames';
import { Text } from '@shared/ui';
import styles from './Text.module.scss';

interface Props {
  children:
    | false
    | string
    | JSX.Element
    | null
    | undefined
    | Array<string | JSX.Element | false>;
  className?: string;
  fontWeight?: 'medium' | 'regular' | 'semibold';
  title?: string;
}

export const TableText = ({
  children,
  className,
  fontWeight = 'regular',
  title,
}: Props) => {
  return (
    <Text
      title={title}
      className={classNames(styles.wrapper, className)}
      fontWeight={fontWeight}
      variant="body14"
    >
      {children}
    </Text>
  );
};
