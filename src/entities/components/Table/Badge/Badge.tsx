import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NewsStatusEnum } from '@shared/constants';
import { Badge } from '@shared/ui';
import styles from './Badge.module.scss';

interface Props {
  className?: string;
  status: keyof typeof NewsStatusEnum;
}

export const TableBadge = ({ className, status }: Props) => {
  const { t } = useTranslation('table');

  const ColorEnum: Record<
    keyof typeof NewsStatusEnum,
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
      {t(`badges.${NewsStatusEnum[status]}`)}
    </Badge>
  );
};
