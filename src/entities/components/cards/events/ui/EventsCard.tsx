import classNames from 'classnames';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { IconCalendar, IconClock } from '@shared/icons';
import { Card, Text } from '@shared/ui';
import styles from './EventsCard.module.scss';

interface Props {
  className?: string;
  image?: string;
  title: string;
  link?: string;
  date: Date;
}

export const EventsCard = ({
  className,
  image,
  title,
  link = '',
  date,
}: Props) => {
  return (
    <Link to={link}>
      <Card
        padding={0}
        flexDirection="column"
        gap={0}
        className={classNames(className)}
      >
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={image} alt={title} />
        </div>
        <div className={styles.text}>
          <Text
            className={styles.textContent}
            variant="body13"
            fontWeight="medium"
          >
            <IconCalendar className={styles.icon} width={20} height={20} />
            {format(date, 'dd.MM.yyyy')}
            <IconClock className={styles.icon} width={20} height={20} />
            {format(date, 'HH:mm')}
          </Text>
          <Text className={styles.title} fontWeight="semibold" variant="body16">
            {title}
          </Text>
        </div>
      </Card>
    </Link>
  );
};
