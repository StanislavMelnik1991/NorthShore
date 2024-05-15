import { PhoneNumbersEditor, TextContentEditor } from '@widgets/Content';
import {
  Cover,
  Modal,
  ModalDelete,
  PageHeader,
  PageSkeleton,
  SubmitActions,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconStaple } from '@shared/icons';
import { Button, Card, Divider, TextField } from '@shared/ui';
import { useUpdatePage } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const {
    t,
    isValid,
    handleSubmit,
    errors,
    setFieldValue,
    values,
    getInputProps,
    open,
    handleSetImage,
    image,
    loadingImage,
    handleCloseModal,
    handleDelete,
    handleOpenModal,
    isModalOpen,
    isLoading,
  } = useUpdatePage();

  return (
    <PageSkeleton>
      <input {...getInputProps()} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalDelete
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          text={t('remove.text')}
          title={t('remove.title')}
        />
      </Modal>
      <PageHeader
        breadcrumbs={[
          {
            title: t('routes.list'),
            href: AppRoutes[AppRoutesEnum.ADMIN_TECHNICAL_WORKS](),
          },
          {
            title: t('routes.update'),
          },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <Card
          loading={isLoading}
          className={styles.card}
          radius={24}
          flexDirection="column"
          gap={24}
        >
          <TextField
            value={values.company_name}
            error={errors.company_name}
            onChange={(ev) => {
              setFieldValue('company_name', ev.target.value);
            }}
            label={t('editor.company_name.label')}
            placeholder={t('editor.company_name.placeholder')}
          />
          <TextField
            value={values.company_address}
            error={errors.company_address}
            onChange={(ev) => {
              setFieldValue('company_address', ev.target.value);
            }}
            label={t('editor.company_address.label')}
            placeholder={t('editor.company_address.placeholder')}
          />
          <PhoneNumbersEditor
            label={t('editor.phone.label')}
            placeholder={t('editor.phone.placeholder')}
            values={values.phone_numbers}
            onChange={(val) => {
              setFieldValue('phone_numbers', val);
            }}
          />
          <TextField
            value={values.url}
            error={errors.url}
            onChange={(ev) => {
              setFieldValue('url', ev.target.value);
            }}
            label={t('editor.url.label')}
            placeholder={t('editor.url.placeholder')}
          />
          <div className={styles.row}>
            <TextField
              value={values.contact_fio}
              error={errors.contact_fio}
              wrapperClassName={styles.select}
              onChange={(ev) => {
                setFieldValue('contact_fio', ev.target.value);
              }}
              label={t('editor.contact_fio.label')}
              placeholder={t('editor.contact_fio.placeholder')}
            />
            <TextField
              value={values.contact_phone}
              error={errors.contact_phone}
              wrapperClassName={styles.select}
              onChange={(ev) => {
                setFieldValue('contact_phone', ev.target.value);
              }}
              label={t('editor.contact_phone.label')}
              placeholder={t('editor.contact_phone.placeholder')}
            />
          </div>
          <TextField
            value={values.discount_value}
            error={errors.discount_value}
            onChange={(ev) => {
              setFieldValue('discount_value', ev.target.value);
            }}
            label={t('editor.discount_value.label')}
            placeholder={t('editor.discount_value.placeholder')}
          />
          <div className={styles.cover}>
            {!image ? (
              <Button
                variant={'light'}
                className={styles.downloadButton}
                type="button"
                onClick={open}
                loading={loadingImage}
              >
                <IconStaple width={24} height={24} />
                {t('controls.upload')}
              </Button>
            ) : (
              <Cover
                src={image.url}
                onRemove={() => handleSetImage(undefined)}
              />
            )}
          </div>
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
          <SubmitActions
            submitText={t('controls.update')}
            onDelete={handleOpenModal}
            className={styles.actions}
            isValid={isValid}
          />
        </Card>
      </form>
    </PageSkeleton>
  );
};

export default Page;
