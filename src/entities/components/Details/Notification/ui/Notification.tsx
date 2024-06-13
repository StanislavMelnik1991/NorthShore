import classNames from 'classnames';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Badge, Text, Title } from '@shared/ui';
import { ToggleWithLabel } from '../../../';
import styles from './Notification.module.scss';

interface Props {
  className?: string;
  createdAt: Date;
  title?: string | null;
  link?: string | null;
  groups: Array<string>;
  needPush: boolean;
  image?: string;
  content?: string | null;
}

export const NotificationContent = ({
  className,
  createdAt,
  groups,
  content,
  image,
  link,
  needPush,
  title,
}: Props) => {
  const { t } = useTranslation('notifications');
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Text variant="body14" fontWeight="medium" className={styles.date}>
        {format(createdAt, 'dd.MM.yyyy')}
      </Text>
      <Title variant="h2" fontWeight="bold">
        {title}
      </Title>
      {link && (
        <div className={styles.label}>
          <Text variant="body14" fontWeight="regular">
            {t('editor.additionalInfo.label')}
          </Text>
          <Link to={link} target="_blank">
            {link}
          </Link>
        </div>
      )}
      {!!groups.length && (
        <div className={styles.label}>
          <Text variant="body14" fontWeight="regular">
            {t('editor.titles.recipients')}
          </Text>
          <div className={styles.groups}>
            {groups.map((el, index) => {
              return (
                <Badge color="white" key={`NotificationContent-badge-${index}`}>
                  {el}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      <ToggleWithLabel
        label={t('editor.push.label')}
        value={needPush}
        disabled
        className={styles.label}
      />
      {image && (
        <img
          className={styles.image}
          src={image}
          alt={'Notification content image'}
        />
      )}
      <Text variant="body16" fontWeight="regular">
        {content}
      </Text>
    </div>
  );
};
