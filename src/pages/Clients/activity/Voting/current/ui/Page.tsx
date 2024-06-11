import { format, formatDistanceToNowStrict } from 'date-fns';
import { enGB, ru } from 'date-fns/locale';
import {
  Answers,
  CurrentSkeleton,
  Modal,
  PageHeader,
  PageSkeleton,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum, LanguageEnum } from '@shared/constants';
import { IconClock } from '@shared/icons';
import { Badge, Button, Text, Title } from '@shared/ui';
import { useCurrent } from '../hook';
import { ModalSubmit } from './ModalSubmit';
import styles from './Page.module.scss';

const localeConfig = {
  en: enGB,
  ru: ru,
};

export default () => {
  const {
    isLoading,
    data,
    t,
    i18n,
    handleVote,
    results,
    handleSubmit,
    isValid,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    isVoting,
  } = useCurrent();

  return (
    <PageSkeleton>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalSubmit
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
        />
      </Modal>
      <PageHeader
        hideTitle
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.ACTIVITY_VOTING](),
            title: t('routes.list'),
          },
          { title: data?.title[i18n.language as LanguageEnum] || ' ' },
        ]}
      />
      {data && (
        <CurrentSkeleton isLoading={isLoading}>
          <Text className={styles.dark} variant="body14" fontWeight="medium">
            {format(data.date_add * 1000, 'dd.MM.yyyy')}
          </Text>
          <Title variant="h2" fontWeight="semibold">
            {data.title[i18n.language as LanguageEnum] || ' '}
          </Title>
          <Text variant="body16" fontWeight="regular">
            {data.body[i18n.language as LanguageEnum] || ' '}
          </Text>
          {data.status.id === 1 && (
            <div className={styles.deadline}>
              <IconClock width={20} height={20} />
              <Text
                variant="body14"
                fontWeight="medium"
                className={styles.dark}
              >
                {`${t('deadline')}: `}
              </Text>
              <Text variant="body14" fontWeight="medium">
                {formatDistanceToNowStrict(data.date_finish * 1000, {
                  locale: localeConfig[i18n.language as LanguageEnum],
                  addSuffix: false,
                })}
              </Text>
            </div>
          )}
          {data.status.id !== 1 && (
            <Badge
              color={
                data.status.id === 2
                  ? 'green'
                  : data.status.id === 1
                    ? 'orange'
                    : 'white'
              }
            >
              {data.status.name}
            </Badge>
          )}
          {data.election_questions.map((el, index) => {
            return (
              <div
                key={`election_question-${el.id}`}
                className={styles.question}
              >
                <Text
                  variant="body16"
                  fontWeight="semibold"
                >{`${index + 1}. ${el?.body[i18n.language as LanguageEnum]}`}</Text>
                <Answers
                  selectedId={el.chosen_answer_id || results[index]?.variantId}
                  onChange={handleVote(el.id)}
                  showPercent={data.status.id !== 1}
                  answers={el.answer_variants}
                  language={i18n.language as LanguageEnum}
                  questionId={el.id}
                  disabled={!!el.chosen_answer_id}
                />
              </div>
            );
          })}
          {!isVoting && (
            <Button
              onClick={handleOpenModal}
              disabled={!isValid}
              className={styles.submit}
              size="large"
            >
              {t('controls.send')}
            </Button>
          )}
        </CurrentSkeleton>
      )}
    </PageSkeleton>
  );
};
