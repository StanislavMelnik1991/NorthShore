import classNames from 'classnames';
import { ContentImageEditor } from '@widgets/Content';
import {
  CustomDatePicker,
  Modal,
  ModalDelete,
  PageHeader,
  PageSkeleton,
  SubmitActions,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card, TextField, Title } from '@shared/ui';
import { useCreatePage } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const {
    t,
    isValid,
    handleSubmit,
    errors,
    setFieldValue,
    values,
    handleSetImageEn,
    handleSetImageRu,
    imageEn,
    imageRu,
    dateEnd,
    dateStart,
    handleSetDateEnd,
    handleSetDateStart,
    isLoading,
    handleCloseModal,
    handleDelete,
    handleOpenModal,
    isModalOpen,
  } = useCreatePage();

  return (
    <PageSkeleton>
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
            href: AppRoutes[AppRoutesEnum.ADMIN_ADVERTISEMENT](),
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
            value={values.title}
            error={errors.title}
            onChange={(ev) => {
              setFieldValue('title', ev.target.value);
            }}
            label={t('editor.title.label')}
            placeholder={t('editor.title.placeholder')}
          />
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
            value={values.url}
            error={errors.url}
            onChange={(ev) => {
              setFieldValue('url', ev.target.value);
            }}
            label={t('editor.url.label')}
            placeholder={t('editor.url.placeholder')}
          />
          <div className={classNames(styles.row, styles.date)}>
            <CustomDatePicker
              showTimeSelect={false}
              dateFormat="dd MM yyyy"
              label={t('editor.date_start.label')}
              value={dateStart}
              setDate={handleSetDateStart}
              error={errors.date_start}
              className={styles.select}
            />
            <CustomDatePicker
              showTimeSelect={false}
              dateFormat="dd MM yyyy"
              label={t('editor.date_end.label')}
              value={dateEnd}
              setDate={handleSetDateEnd}
              error={errors.date_finish}
              className={styles.select}
            />
          </div>
          <Title fontWeight="bold" variant="h2">
            {t('editor.titles.ru')}
          </Title>
          <ContentImageEditor
            aspectRatio={471 / 160}
            label={t('editor.company_name.label')}
            setImage={handleSetImageRu}
            image={imageRu}
          />
          <Title fontWeight="bold" variant="h2">
            {t('editor.titles.en')}
          </Title>
          <ContentImageEditor
            aspectRatio={471 / 160}
            label={t('editor.company_name.label')}
            setImage={handleSetImageEn}
            image={imageEn}
          />
          <SubmitActions
            onDelete={handleOpenModal}
            submitText={t('controls.update')}
            className={styles.actions}
            isValid={isValid}
          />
        </Card>
      </form>
    </PageSkeleton>
  );
};

export default Page;
