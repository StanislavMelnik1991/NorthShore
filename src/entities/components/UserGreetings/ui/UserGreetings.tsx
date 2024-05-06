import classNames from 'classnames';
import { IconCalendar } from '@shared/icons';
import { Card, Text, Title } from '@shared/ui';
import image from '../assets/greetingsLogo.png';
import styles from './UserGreetings.module.scss';

interface Props {
  className?: string;
  title: string;
  date: string;
}

export const UserGreetings = ({ className, title, date }: Props) => {
  return (
    <Card className={classNames(styles.wrapper, className)}>
      <div className={styles.content}>
        <Title variant="h3" fontWeight="semibold">
          {title}
        </Title>
        <div className={styles.calendar}>
          <IconCalendar width={20} height={20} />
          <Text variant="body14" fontWeight="regular">
            {date}
          </Text>
        </div>
      </div>
      <img className={styles.image} src={image} />
    </Card>
  );
};
