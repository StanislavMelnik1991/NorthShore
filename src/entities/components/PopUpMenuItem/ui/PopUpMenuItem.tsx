import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import { Text } from '@shared/ui';
import styles from './PopUpMenuItem.module.scss';

interface Props {
  className?: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  icon?: JSX.Element;
  text: string;
}

export const PopUpMenuItem = ({ className, onClick, text, icon }: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)} onClick={onClick}>
      {icon}
      <Text fontWeight="regular" variant="body14">
        {text}
      </Text>
    </div>
  );
};
