import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import {
  PageHeader,
  PageSkeleton,
  PasswordField,
  StyledSelect,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card, TextField, Text, Button } from '@shared/ui';
import { useCreatePage } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const {
    handleSubmit,
    t,
    handleChangeRoleSelection,
    handleChangeDepartmentSelection,
    isRolesLoading,
    rolesOptions,
    selectedRole,
    isDepartmentsLoading,
    departmentsOptions,
    selectedDepartment,
    errors,
    isValid,
    setFieldValue,
    values,
  } = useCreatePage();

  const navigate = useNavigate();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            title: t('routes.employees'),
            href: AppRoutes[AppRoutesEnum.EMPLOYEES](),
          },
          {
            title: t('routes.create'),
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
          <TextField
            value={values.name}
            onChange={(ev) => setFieldValue('name', ev.target.value)}
            error={errors.name}
            label={t('editor.name.label')}
            placeholder={t('editor.name.placeholder')}
          />
          <TextField
            value={values.id_1c}
            onChange={(ev) => setFieldValue('id_1c', ev.target.value)}
            error={errors.id_1c}
            label={t('editor.id_1c.label')}
            placeholder={t('editor.id_1c.placeholder')}
          />
          <StyledSelect
            isClearable={false}
            label={t('editor.department.label')}
            placeholder={t('editor.department.placeholder')}
            value={selectedDepartment}
            onChange={handleChangeDepartmentSelection}
            options={departmentsOptions}
            isLoading={isDepartmentsLoading}
            className={styles.select}
            error={errors.department_id}
          />
          <TextField
            value={values.job_title}
            onChange={(ev) => {
              setFieldValue('job_title', ev.target.value);
            }}
            error={errors.job_title}
            label={t('editor.job_title.label')}
            placeholder={t('editor.job_title.placeholder')}
          />
          <div className={classNames(styles.row, styles.workType)}>
            <TextField
              value={values.phone_number}
              onChange={(ev) => {
                setFieldValue('phone_number', ev.target.value);
              }}
              error={errors.phone_number}
              label={t('editor.phone.label')}
              placeholder={t('editor.phone.placeholder')}
            />
            <TextField
              value={values.work_phone}
              onChange={(ev) => {
                setFieldValue('work_phone', ev.target.value);
              }}
              error={errors.work_phone}
              label={t('editor.work_phone.label')}
              placeholder={t('editor.work_phone.placeholder')}
            />
          </div>
          <StyledSelect
            isClearable={false}
            label={t('editor.role.label')}
            placeholder={t('editor.role.placeholder')}
            value={selectedRole}
            onChange={handleChangeRoleSelection}
            options={rolesOptions}
            isLoading={isRolesLoading}
            error={errors.role_id}
            className={classNames(styles.select_role, styles.select)}
          />
          <Text className={styles.title}>{t('titles.credentials')}</Text>
          <PasswordField
            value={values.password}
            onChange={(ev) => {
              setFieldValue('password', ev.target.value);
            }}
            error={errors.password}
            label={t('editor.password.label')}
            placeholder={t('editor.password.placeholder')}
            wrapperClassName={styles.password}
          />
          <div className={styles.submitBlock}>
            <Button
              className={styles.submitButton}
              size="large"
              variant="primary"
              type="submit"
              disabled={!isValid}
            >
              {t('controls.create')}
            </Button>
            <Button
              className={styles.submitButton}
              size="large"
              variant="secondary"
              type="button"
              onClick={() => navigate(-1)}
            >
              {t('controls.cancel')}
            </Button>
          </div>
        </Card>
      </form>
    </PageSkeleton>
  );
};

export default Page;
