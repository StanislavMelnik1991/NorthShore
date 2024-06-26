import classNames from 'classnames';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { CurrentSkeleton } from '@entities/components';
import { Text } from '@shared/ui';
import styles from './Comment.module.scss';

interface Props {
  className?: string;
  date: Date;
  text?: string;
}

export const RequestComment = ({ className, date, text }: Props) => {
  const { t } = useTranslation();
  if (!text) {
    return <></>;
  }
  return (
    <CurrentSkeleton className={classNames(styles.wrapper, className)}>
      <div className={styles.header}>
        <Text variant="body16" fontWeight="semibold">
          {t('comment')}
        </Text>
        <Text className={styles.date} variant="body14" fontWeight="regular">
          {format(date, 'dd.MM.yyyy')}
        </Text>
      </div>
      <Text variant="body14" fontWeight="regular">
        {text}
      </Text>
    </CurrentSkeleton>
  );
};
