import { QuestionEditor } from '@widgets/Voting';
import { PageHeader, PageSkeleton } from '@entities/components';
import {
  ACCEPTED_LANGUAGES,
  AppRoutes,
  AppRoutesEnum,
  LanguageEnum,
} from '@shared/constants';
import { QUESTIONS_LIMIT } from '@shared/constants/voting.constants';
import { IconPlus } from '@shared/icons';
import { Button, Card, Divider } from '@shared/ui';
import { useUpdatePage } from '../hook/';
import styles from './Page.module.scss';

const Page = () => {
  const {
    questions,
    t,
    isLoading,
    id,
    is_archive,
    handleChangeQuestion,
    handleDeleteQuestion,
    creationLoading,
    handleCreate,
    back,
    handleSubmit,
  } = useUpdatePage();
  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.ADMIN_VOTING](),
            title: t('routes.list'),
          },
          { title: is_archive ? t('routes.create') : t('routes.edit') },
        ]}
      />
      <Card
        loading={isLoading}
        className={styles.card}
        radius={24}
        flexDirection="column"
        gap={20}
      >
        {questions.map((el, index) => {
          return (
            <div
              className={styles.questions}
              key={`QuestionEditor-${el['ru'].id}-wrapper`}
            >
              {ACCEPTED_LANGUAGES.map((lang) => {
                return (
                  <QuestionEditor
                    onDelete={handleDeleteQuestion(index)}
                    onChange={{
                      en: handleChangeQuestion({
                        index,
                        lang: LanguageEnum.EN,
                      }),
                      ru: handleChangeQuestion({
                        index,
                        lang: LanguageEnum.RU,
                      }),
                    }}
                    serialNumber={index + 1}
                    votingId={id}
                    data={el}
                    language={lang}
                    key={`QuestionEditor-${el[lang].id}-${lang}`}
                  />
                );
              })}
              <Button
                variant="primary"
                onClick={handleCreate}
                loading={creationLoading}
                disabled={questions.length >= QUESTIONS_LIMIT}
                className={styles.addButton}
              >
                <IconPlus width={20} height={20} />
                {t('controls.addQuestion')}
              </Button>
              <Divider className={styles.divider} />
            </div>
          );
        })}
        <div className={styles.submit}>
          <Button className={styles.button} onClick={handleSubmit}>
            {t('controls.publish')}
          </Button>
          <Button className={styles.button} onClick={back} variant="light">
            {t('controls.back')}
          </Button>
        </div>
      </Card>
    </PageSkeleton>
  );
};

export default Page;
