import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Card, Text } from '@shared/ui';
import styles from './Announcement.module.scss';

interface Props {
  className?: string;
  title: string;
  html: string;
  date: number;
  onClick?: () => void;
}

export const Announcement = ({
  className,
  title,
  html,
  date,
  onClick,
}: Props) => {
  const { i18n } = useTranslation();
  return (
    <div
      className={classNames(className, styles.card__wrapper)}
      onClick={onClick}
    >
      <Card className={classNames(styles.card, className)}>
        <Text
          className={styles.textContent}
          variant="body13"
          fontWeight="medium"
        >
          {new Date(date).toLocaleDateString(i18n.language, {
            day: 'numeric',
            month: 'long',
          })}
        </Text>
        <Text className={styles.title} fontWeight="semibold" variant="body16">
          {title}
        </Text>
        <div
          className={styles.htmlContent}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </Card>
    </div>
  );
};
