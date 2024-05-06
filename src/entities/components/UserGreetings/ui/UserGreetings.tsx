import classNames from 'classnames';
import { IconCalendar } from '@shared/icons';
import { Card, Text, Title } from '@shared/ui';
import styles from './UserGreetings.module.scss';

interface Props {
  className?: string;
  title: string;
  date: string;
}

export const UserGreetings = ({ className, title, date }: Props) => {
  const baseUsr = __API__;
  return (
    <Card className={classNames(styles.wrapper, className)}>
      <img className={styles.image} src={`${baseUsr}/user_cover`} />
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
    </Card>
  );
};
