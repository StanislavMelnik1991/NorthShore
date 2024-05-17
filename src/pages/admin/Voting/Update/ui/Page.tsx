import { RecipientGroupsEditor, TextContentEditor } from '@widgets/Content';
import {
  CustomDatePicker,
  PageHeader,
  PageSkeleton,
  SubmitActions,
  ToggleWithLabel,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card, CheckBox, Divider } from '@shared/ui';
import { useUpdatePage } from '../hook/';
import styles from './Page.module.scss';

const Page = () => {
  const {
    errors,
    handleSubmit,
    setFieldValue,
    values,
    isValid,
    t,
    isSendToAll,
    setIsSendToAll,
    initialAccessAddress,
    isLoading,
  } = useUpdatePage();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.ADMIN_VOTING](),
            title: t('routes.list'),
          },
          { title: values.is_archive ? t('routes.create') : t('routes.edit') },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <Card
          loading={isLoading}
          className={styles.card}
          radius={24}
          flexDirection="column"
          gap={32}
        >
          <RecipientGroupsEditor
            initialAccess={initialAccessAddress}
            setIsSendToAll={setIsSendToAll}
            isSendToAll={isSendToAll}
            setFieldValue={setFieldValue}
            title={t('editor.titles.recipients')}
          />
          <CustomDatePicker
            showTimeSelect={false}
            dateFormat="dd MM yyyy"
            value={values.date_finish || null}
            label={t('editor.date_finish.label')}
            setDate={(val) => setFieldValue('date_finish', val)}
          />
          <ToggleWithLabel
            label={t('editor.push.label')}
            value={values.need_push}
            onChange={() => setFieldValue('need_push', !values.need_push)}
          />
          <CheckBox
            value={values.show_result}
            label={t('editor.show_result.label')}
            onChange={(val) => setFieldValue('show_result', val)}
          />
          <TextContentEditor
            title={t('editor.titles.ru')}
            titleEditor={{
              onChange: (val) => {
                setFieldValue('title_ru', val);
              },
              value: values.title_ru,
              error: errors.title_ru,
              label: t('editor.title.label'),
              placeholder: t('editor.title.placeholder'),
            }}
            contentEditor={{
              onChange: (val) => {
                setFieldValue('body_ru', val);
              },
              value: values.body_ru,
              error: errors.body_ru,
              label: t('editor.text.label'),
              placeholder: t('editor.text.placeholder'),
            }}
            variant="textarea"
          />
          <Divider />
          <TextContentEditor
            title={t('editor.titles.en')}
            titleEditor={{
              onChange: (val) => {
                setFieldValue('title_en', val);
              },
              value: values.title_en,
              error: errors.title_en,
              label: t('editor.title.label'),
              placeholder: t('editor.title.placeholder'),
            }}
            contentEditor={{
              onChange: (val) => {
                setFieldValue('body_en', val);
              },

              value: values.body_en,
              error: errors.body_en,
              label: t('editor.text.label'),
              placeholder: t('editor.text.placeholder'),
            }}
            variant="textarea"
          />
          <SubmitActions isValid={isValid} submitText={t('controls.next')} />
        </Card>
      </form>
    </PageSkeleton>
  );
};

export default Page;
