import classNames from 'classnames';
import { format } from 'date-fns';
import { RequestStatusEnum } from '@shared/constants';
import { Badge, Card, Text } from '@shared/ui';
import { StatusLabel } from '../../../StatusLabel';
import styles from './InvocationCard.module.scss';

type CardType = 'request' | 'application';
type Colors = 'blue' | 'violet';

interface Props {
  className?: string;
  type: CardType;
  id: number;
  date: Date;
  title: string;
  status: keyof typeof RequestStatusEnum;
}

export const InvocationCard = ({
  className,
  date,
  id,
  title,
  type,
  status,
}: Props) => {
  const badgeConfig: Record<CardType, { color: Colors; label: string }> = {
    request: { color: 'blue', label: 'Заявка' },
    application: { color: 'violet', label: 'Обращение' },
  };
  return (
    <Card
      padding={0}
      flexDirection="column"
      gap={0}
      className={classNames(className)}
    >
      <div className={styles.header}>
        <Badge color={badgeConfig[type].color} className={styles.timeStamp}>
          {badgeConfig[type].label}
        </Badge>
      </div>
      <div className={styles.about}>
        <Text>{`№${id}`}</Text>
        <Text className={styles.gray}>{format(date, 'dd.MM.yyyy')}</Text>
      </div>
      <Text className={styles.title} variant="body16" fontWeight="semibold">
        {title}
      </Text>
      <div className={styles.status}>
        <StatusLabel status={status} />
      </div>
    </Card>
  );
};
