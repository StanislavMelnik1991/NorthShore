import classNames from 'classnames';
import { format } from 'date-fns';
import { MouseEventHandler } from 'react';
import { formatAddress } from '@features/utils';
import { Answers } from '@entities/components';
import { IAnswer, IVoting } from '@entities/types';
import { LanguageEnum } from '@shared/constants';
import { IconCalendar } from '@shared/icons';
import { Badge, CheckBox, Text, Title, Toggle } from '@shared/ui';
import { useVoting } from '../hook';
import styles from './Voting.module.scss';

interface Props {
  className?: string;
  data?: IVoting;
  language: LanguageEnum;
  showPercent?: boolean;
  onAnswerClick?: (answer: IAnswer) => MouseEventHandler;
}

export const VotingContent = ({
  className,
  data,
  language,
  showPercent,
  onAnswerClick,
}: Props) => {
  const { t, dateLocale } = useVoting();
  const publishDate = new Date(data ? data.date_add * 1000 : Date.now());
  const deadlineDate = new Date(data ? data.date_finish * 1000 : Date.now());
  const groupArr =
    data?.recipient_groups.map((el) => {
      return formatAddress(el);
    }) || [];
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Text className={styles.dark} variant="body14" fontWeight="medium">
        {format(publishDate, 'dd.MM.yyyy')}
      </Text>
      <Title variant="h2" fontWeight="semibold">
        {data?.title[language] || ' '}
      </Title>
      <Text className={styles.dark} variant="body14" fontWeight="medium">
        {t('editor.titles.recipients')}
      </Text>
      <div className={styles.wrap}>
        {groupArr.map((el, index) => {
          return (
            <Badge
              color="white"
              key={`group-badge-${index}`}
              className={styles.badge}
            >
              {el}
            </Badge>
          );
        })}
      </div>
      <div className={styles.wrap}>
        <div className={styles.element}>
          <Text className={styles.dark} variant="body14" fontWeight="medium">
            {t('editor.date_finish.label')}
          </Text>
          <div className={styles.wrap}>
            <IconCalendar width={20} height={20} />
            <Text variant="body16" fontWeight="regular">
              {format(deadlineDate, 'dd MMMM', { locale: dateLocale })}
            </Text>
          </div>
        </div>
        <div className={styles.element}>
          <Text className={styles.dark} variant="body14" fontWeight="medium">
            {t('editor.push.label')}
          </Text>
          <Toggle value={Boolean(data?.need_push)} disabled />
        </div>
      </div>
      <CheckBox
        value={Boolean(data?.show_result)}
        disabled
        label={t('editor.show_result.label')}
      />
      <Text variant="body16" fontWeight="regular">
        {data?.body[language]}
      </Text>
      {data?.election_questions.map((el, index) => {
        return (
          <div key={`election_question-${el.id}`} className={styles.question}>
            <Text
              variant="body16"
              fontWeight="semibold"
            >{`${index + 1}. ${el?.body[language]}`}</Text>
            <Answers
              onAnswerClick={onAnswerClick}
              showPercent={showPercent || data.status.id !== 1}
              answers={el.answer_variants}
              language={language}
              questionId={el.id}
            />
          </div>
        );
      })}
    </div>
  );
};
