import classNames from 'classnames';
import { RecipientGroupsEditor, TextContentEditor } from '@widgets/Content';
import {
  CustomDatePicker,
  Modal,
  ModalDelete,
  PageHeader,
  PageSkeleton,
  StyledSelect,
  SubmitActions,
  ToggleWithLabel,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card, Divider, TextField } from '@shared/ui';
import { useCreateIntercomPage } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const {
    errors,
    handleChangeNatureSelection,
    handleChangeTypeSelection,
    handleSubmit,
    isNaturesLoading,
    isTypesLoading,
    isValid,
    natures,
    selectedNature,
    selectedType,
    setFieldValue,
    t,
    types,
    values,
    isSendToAll,
    setIsSendToAll,
    isStaffLoading,
    selectedStaff,
    staffOptions,
    initialAccessAddress,
    handleChangeStaffSelection,
    handleCloseModal,
    handleOpenModal,
    isLoading,
    isModalOpen,
    handleDelete,
  } = useCreateIntercomPage();

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
            title: t('title'),
            href: AppRoutes[AppRoutesEnum.ADMIN_TECHNICAL_WORKS](),
          },
          {
            title: t('update'),
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
          <div className={classNames(styles.row, styles.workType)}>
            <StyledSelect
              isClearable={false}
              label={t('editor.type.label')}
              placeholder={t('editor.type.placeholder')}
              error={errors.type_id}
              value={selectedType}
              onChange={handleChangeTypeSelection}
              options={types}
              isLoading={isTypesLoading}
              className={styles.select}
            />
            <StyledSelect
              isClearable={false}
              label={t('editor.nature.label')}
              placeholder={t('editor.nature.placeholder')}
              error={errors.nature_id}
              value={selectedNature}
              onChange={handleChangeNatureSelection}
              options={natures}
              isLoading={isNaturesLoading}
              className={styles.select}
            />
          </div>
          <StyledSelect
            isClearable={false}
            label={t('editor.staff.label')}
            placeholder={t('editor.staff.placeholder')}
            error={errors.responsible_id}
            value={selectedStaff}
            onChange={handleChangeStaffSelection}
            options={staffOptions}
            isLoading={isStaffLoading}
            className={classNames(styles.select, styles.staff)}
          />
          <TextField
            value={values.url}
            wrapperClassName={styles.url}
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
              value={values.date_start}
              setDate={(val) => setFieldValue('date_start', val)}
              error={errors.date_start}
              className={styles.select}
            />
            <CustomDatePicker
              showTimeSelect={false}
              dateFormat="dd MM yyyy"
              label={t('editor.date_end.label')}
              value={values.date_end}
              setDate={(val) => setFieldValue('date_end', val)}
              error={errors.date_end}
              className={styles.select}
            />
            <ToggleWithLabel
              label={t('editor.need_push.label')}
              value={Boolean(values.need_push)}
              className={styles.select}
              onChange={() => setFieldValue('need_push', !values.need_push)}
            />
          </div>
          <RecipientGroupsEditor
            initialAccess={initialAccessAddress}
            className={styles.recipients}
            setIsSendToAll={setIsSendToAll}
            isSendToAll={isSendToAll}
            setFieldValue={setFieldValue}
            title={t('editor.titles.recipients')}
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
