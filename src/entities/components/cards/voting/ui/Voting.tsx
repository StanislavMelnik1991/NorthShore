import classNames from 'classnames';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { ru, enGB } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LanguageEnum } from '@shared/constants';
import { IconClock } from '@shared/icons';
import { Badge, Card, Text } from '@shared/ui';
import styles from './Voting.module.scss';

interface Props {
  className?: string;
  link: string;
  date: Date;
  deadLine: Date;
  title: string;
}

const localeConfig = {
  en: enGB,
  ru: ru,
};

export const VotingCard = ({
  className,
  date,
  link,
  title,
  deadLine,
}: Props) => {
  const { t, i18n } = useTranslation('voting');
  return (
    <Link to={link}>
      <Card
        padding={16}
        flexDirection="column"
        gap={12}
        className={classNames(styles.wrapper, className)}
      >
        <div className={styles.header}>
          <Badge color="blue">{t('routes.voting')}</Badge>
          <Text variant="small" fontWeight="regular" className={styles.dark}>
            {format(date, 'dd.MM.yyy')}
          </Text>
        </div>
        <Text variant="body16" fontWeight="semibold">
          {title}
        </Text>
        <div className={styles.deadline}>
          <IconClock width={20} height={20} />
          <Text variant="body14" fontWeight="medium" className={styles.dark}>
            {`${t('deadline')}: `}
          </Text>
          <Text variant="body14" fontWeight="medium">
            {formatDistanceToNowStrict(deadLine, {
              locale: localeConfig[i18n.language as LanguageEnum],
              addSuffix: false,
            })}
          </Text>
        </div>
      </Card>
    </Link>
  );
};
