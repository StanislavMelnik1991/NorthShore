import classNames from 'classnames';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Badge, Card, Text } from '@shared/ui';
import styles from './NewsCard.module.scss';

interface Props {
  className?: string;
  image?: string;
  title: string;
  text: string;
  link?: string;
  published_date: Date;
}

export const NewsCard = ({
  className,
  image,
  text,
  title,
  link = '',
  published_date,
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
          <Badge color="dark" className={styles.timeStamp}>
            {format(published_date, 'dd.MM.yyyy')}
          </Badge>
        </div>
        <div className={styles.text}>
          <Text className={styles.title} fontWeight="semibold" variant="body16">
            {title}
          </Text>
          <Text
            className={styles.textContent}
            fontWeight="regular"
            variant="body14"
          >
            {text}
          </Text>
        </div>
      </Card>
    </Link>
  );
};
