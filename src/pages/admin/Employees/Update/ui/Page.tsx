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
import { useUpdatePage } from '../hook';
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
    name,
    setName,
    job_title,
    setJob_title,
    phone_number,
    setPhone_number,
    work_phone,
    setWork_phone,
    password,
    setPassword,
  } = useUpdatePage();

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
            title: t('routes.update'),
          },
        ]}
      />
      <Card className={styles.card} radius={24} flexDirection="column" gap={24}>
        <TextField
          value={name}
          onChange={(ev) => {
            setName(ev.target.value);
          }}
          label={t('editor.name.label')}
          placeholder={t('editor.name.placeholder')}
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
        />
        <TextField
          value={job_title}
          onChange={(ev) => {
            setJob_title(ev.target.value);
          }}
          label={t('editor.job_title.label')}
          placeholder={t('editor.job_title.placeholder')}
        />
        <div className={classNames(styles.row, styles.workType)}>
          <TextField
            value={phone_number}
            onChange={(ev) => {
              setPhone_number(ev.target.value);
            }}
            label={t('editor.phone.label')}
            placeholder={t('editor.phone.placeholder')}
          />
          <TextField
            value={work_phone}
            onChange={(ev) => {
              setWork_phone(ev.target.value);
            }}
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
          className={classNames(styles.select_role, styles.select)}
        />
        <Text className={styles.title}>{t('titles.credentials')}</Text>
        <PasswordField
          value={password}
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
          label={t('editor.password.label')}
          placeholder={t('editor.password.placeholder')}
          wrapperClassName={styles.password}
        />
        <div className={styles.submitBlock}>
          <Button
            className={styles.submitButton}
            size="large"
            variant="primary"
            onClick={handleSubmit}
          >
            {t('controls.update')}
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
    </PageSkeleton>
  );
};

export default Page;
