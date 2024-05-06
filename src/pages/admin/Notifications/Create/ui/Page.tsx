import {
  AdditionalImagesEditor,
  RecipientGroupsEditor,
  TextContentEditor,
} from '@widgets/Content';
import {
  PageHeader,
  PageSkeleton,
  SubmitActions,
  ToggleWithLabel,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card, Divider, TextField } from '@shared/ui';
import { useCreatePage } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const {
    image,
    loading,
    onDrop,
    errors,
    handleSubmit,
    setFieldValue,
    values,
    isValid,
    t,
    handleRemoveImage,
    isSendToAll,
    setIsSendToAll,
  } = useCreatePage();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.ADMIN_NOTIFICATIONS](),
            title: t('routes.list'),
          },
          { title: t('routes.create') },
        ]}
        /* controls={
      <Button
        variant="white"
        size="small"
        onClick={() => setOpen(true)}
        disabled={!isValid || values.title_ru === ''}
      >
        <IconEyeOpen width={20} height={20} />
        {t('controls.preview')}
      </Button>
    } */
      />
      <form onSubmit={handleSubmit}>
        <Card
          className={styles.card}
          radius={24}
          flexDirection="column"
          gap={32}
        >
          {/* <Modal
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
          >
          <ContentWithLanguageSelection config={modalConfig} />
        </Modal> */}

          <RecipientGroupsEditor
            setIsSendToAll={setIsSendToAll}
            isSendToAll={isSendToAll}
            setFieldValue={setFieldValue}
            title={t('editor.titles.recipients')}
          />
          <TextField
            value={values.url}
            error={errors.url}
            onChange={(ev) => {
              if (ev.target.value === '') {
                setFieldValue('url', undefined);
                return;
              }
              setFieldValue('url', ev.target.value);
            }}
            label={t('editor.additionalInfo.label')}
            placeholder={t('editor.additionalInfo.placeholder')}
          />
          <AdditionalImagesEditor
            image={image}
            onDrop={onDrop}
            onRemove={handleRemoveImage}
            loading={loading}
          />
          <ToggleWithLabel
            label={t('editor.push.label')}
            value={values.need_push}
            onChange={() => setFieldValue('need_push', !values.need_push)}
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
          <SubmitActions isValid={isValid} submitText={t('controls.create')} />
        </Card>
      </form>
    </PageSkeleton>
  );
};

export default Page;
