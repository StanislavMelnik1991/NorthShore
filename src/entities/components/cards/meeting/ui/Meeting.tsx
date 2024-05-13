import classNames from 'classnames';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Badge, Card, Text } from '@shared/ui';
import { DateDetails } from '../../../Details';
import styles from './Meeting.module.scss';

interface Props {
  className?: string;
  link: string;
  date: Date;
  deadLine: Date;
  title: string;
}

export const MeetingCard = ({
  className,
  date,
  link,
  title,
  deadLine,
}: Props) => {
  const { t } = useTranslation('meetings');
  return (
    <Link to={link}>
      <Card
        padding={16}
        flexDirection="column"
        gap={12}
        className={classNames(styles.wrapper, className)}
      >
        <div className={styles.header}>
          <Badge color="violet">{t('routes.meeting')}</Badge>
          <Text variant="small" fontWeight="regular" className={styles.dark}>
            {format(date, 'dd.MM.yyy')}
          </Text>
        </div>
        <Text variant="body16" fontWeight="semibold">
          {title}
        </Text>
        <DateDetails
          className={styles.deadline}
          showLabels={false}
          date={deadLine}
        />
      </Card>
    </Link>
  );
};
