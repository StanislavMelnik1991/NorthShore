import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { StatusEnum } from '@shared/constants';
import { Badge } from '@shared/ui';
import styles from './Badge.module.scss';

interface Props {
  className?: string;
  status: keyof typeof StatusEnum;
}

export const TableBadge = ({ className, status }: Props) => {
  const { t } = useTranslation('table');

  const ColorEnum: Record<
    keyof typeof StatusEnum,
    'violet' | 'green' | 'dark' | 'blue' | 'orange' | 'red' | 'white'
  > = {
    0: 'violet',
    1: 'green',
    2: 'white',
  };

  return (
    <Badge
      className={classNames(styles.wrapper, className)}
      color={ColorEnum[status]}
    >
      {t(`badges.${StatusEnum[status]}`)}
    </Badge>
  );
};
