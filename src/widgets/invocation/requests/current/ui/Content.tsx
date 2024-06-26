import classNames from 'classnames';
import { format } from 'date-fns';
import {
  DateDetails,
  LinkDetails,
  CurrentSkeleton,
  Cover,
} from '@entities/components';
import { StatusLabel } from '@entities/components/StatusLabel';
import { IFile } from '@entities/types';
import { RequestStatusEnum } from '@shared/constants';
import { Badge, Divider, Text, Title } from '@shared/ui';
import styles from './Content.module.scss';

interface Props {
  className?: string;
  isLoading?: boolean;
  created_at?: Date;
  title?: string;
  idTitle?: string;
  text?: string;
  date?: Date;
  link?: string;
  images?: Array<IFile>;
  status?: keyof typeof RequestStatusEnum;
  contact?: string;
  contactsTitle?: string;
  theme?: string;
}

export const RequestContentWidget = ({
  className,
  isLoading,
  created_at,
  text = '',
  title,
  date,
  link,
  idTitle,
  images,
  contact,
  contactsTitle,
  status,
  theme,
}: Props) => {
  return (
    <CurrentSkeleton
      className={classNames(styles.wrapper, className)}
      isLoading={isLoading}
    >
      <div className={styles.header}>
        {created_at && (
          <Badge color="white">{format(created_at, 'dd.MM.yyyy')}</Badge>
        )}
        {created_at && <Badge color="blue">{theme}</Badge>}
      </div>
      <Title className={styles.title} fontWeight="semibold" variant="h2">
        {idTitle}
      </Title>
      <Title className={styles.title} fontWeight="semibold" variant="h4">
        {title}
      </Title>
      {status && (
        <StatusLabel
          type={'request'}
          className={styles.status}
          status={status}
        />
      )}
      {date && <DateDetails date={date} />}
      {link && <LinkDetails href={link} />}
      {text && <Text variant="body14">{text}</Text>}
      {!!images?.length && (
        <div className={styles.images}>
          {images.map((el) => {
            return <Cover src={el.url} key={`RequestContent-image-${el.id}`} />;
          })}
        </div>
      )}
      {!!contact && (
        <div className={styles.contacts}>
          <Divider className={styles.divider} />
          <Text>{contactsTitle}</Text>
          <Text fontWeight="medium">{contact}</Text>
        </div>
      )}
    </CurrentSkeleton>
  );
};
