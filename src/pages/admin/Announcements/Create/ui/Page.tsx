import {
  PageHeader,
  PageSkeleton,
  QuillEditor,
  StyledSelect,
  SubmitActions,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card, TextField } from '@shared/ui';
import { useCreateIntercomPage } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const {
    values,
    errors,
    setFieldValue,
    groups,
    handleChangeGroups,
    handleSubmit,
    isValid,
    t,
    groupOptions,
    isOptionsLoading,
    handleUploadImage,
  } = useCreateIntercomPage();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            title: t('table'),
            href: AppRoutes[AppRoutesEnum.ADMIN_EMPLOYEE_ANNOUNCEMENTS](),
          },
          {
            title: t('create'),
          },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <Card
          className={styles.card}
          radius={24}
          flexDirection="column"
          gap={24}
        >
          <StyledSelect
            label={t('editor.group.label')}
            placeholder={t('editor.group.placeholder')}
            error={errors.recipient_groups}
            isMulti
            value={groups}
            onChange={handleChangeGroups}
            options={groupOptions}
            isLoading={isOptionsLoading}
          />
          <TextField
            value={values.title}
            error={errors.title}
            onChange={(ev) => {
              setFieldValue('title', ev.target.value);
            }}
            wrapperClassName={styles.textField}
            label={t('editor.title.label')}
            placeholder={t('editor.title.placeholder')}
          />
          <QuillEditor
            error={errors.body}
            label={t('editor.body.label')}
            placeholder={t('editor.body.placeholder')}
            initialValue={values.body || ''}
            setValue={(val) => setFieldValue('body', val)}
            uploadImage={handleUploadImage}
          />
          <SubmitActions
            submitText={t('controls.publish')}
            className={styles.actions}
            isValid={isValid}
          />
        </Card>
      </form>
    </PageSkeleton>
  );
};

export default Page;
