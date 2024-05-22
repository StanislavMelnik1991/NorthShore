import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Badge, Card, Text } from '@shared/ui';
import styles from './Card.module.scss';

interface Props {
  className?: string;
  image?: string;
  title: string;
  text: string;
  link?: string;
  discount?: string;
}

export const ServicesCard = ({
  className,
  image,
  text,
  title,
  link = '',
  discount,
}: Props) => {
  return (
    <Link to={link}>
      <Card
        padding={12}
        flexDirection="row"
        gap={12}
        className={classNames(className)}
      >
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={image} alt={title} />
          {discount && (
            <Badge color="primary" className={styles.timeStamp}>
              {discount}
            </Badge>
          )}
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
