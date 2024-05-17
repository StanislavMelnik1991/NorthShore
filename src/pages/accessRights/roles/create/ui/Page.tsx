import { PageHeader, PageSkeleton, SubmitActions } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card, CheckBox, Text, TextField, Title } from '@shared/ui';
import { useSecurityAccessPage } from '../hook';
import styles from './Page.module.scss';

const MainPage = () => {
  const {
    t,
    isLoading,
    accessCodesList,
    changeSelection,
    errors,
    handleSubmit,
    setFieldValue,
    values,
    isValid,
  } = useSecurityAccessPage();
  return (
    <PageSkeleton className={styles.wrapper}>
      <PageHeader
        breadcrumbs={[
          {
            title: t('modules.list'),
            href: AppRoutes[AppRoutesEnum.ADMIN_ROLES](),
          },
          {
            title: t('modules.create'),
            href: AppRoutes[AppRoutesEnum.ADMIN_ROLES_CREATE](),
          },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <Card
          className={styles.card}
          flexDirection="column"
          loading={isLoading}
        >
          <TextField
            value={values.name}
            error={errors.name}
            onChange={(ev) => setFieldValue('name', ev.target.value)}
            label={t('editor.name.label')}
            placeholder={t('editor.name.placeholder')}
          />
          <TextField
            value={values.description}
            error={errors.description}
            onChange={(ev) => setFieldValue('description', ev.target.value)}
            label={t('editor.description.label')}
            placeholder={t('editor.description.placeholder')}
          />
          <Title variant="h4" fontWeight="semibold">
            {t('modules.accessRights')}
          </Title>
          {accessCodesList &&
            Object.entries(accessCodesList).map(([section, el]) => {
              return (
                <div key={`accessCodesList-${section}`} className={styles.list}>
                  <Text variant="body16" fontWeight="semibold">
                    {section}
                  </Text>
                  {el.map(({ id, isSelected, name }, index) => {
                    return (
                      <CheckBox
                        key={`accessCodesListItem-${id}`}
                        value={isSelected}
                        label={name}
                        onChange={changeSelection(section)(index)}
                      />
                    );
                  })}
                </div>
              );
            })}
          <SubmitActions
            submitText={t('actions.add')}
            className={styles.actions}
            isValid={isValid}
          />
        </Card>
      </form>
    </PageSkeleton>
  );
};

export default MainPage;
