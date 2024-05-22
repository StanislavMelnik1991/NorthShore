import { AddressFilters } from '@features/address';
import { PageHeader, PageSkeleton, SubmitActions } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card, TextField } from '@shared/ui';
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
    handleChangeSelection,
  } = useCreatePage();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            title: t('routes.elevators.list'),
            href: AppRoutes[AppRoutesEnum.ENGINEERING_ELEVATORS](),
          },
          {
            title: t('routes.elevators.create'),
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
          <AddressFilters
            errors={{
              entrance: errors.entrance_id,
            }}
            showLabel
            setFilters={handleChangeSelection}
          />
          <TextField
            label={t('editor.ip_address.label')}
            placeholder={t('editor.ip_address.placeholder')}
            error={errors.ip_address}
            value={values.ip_address}
            onChange={(ev) => setFieldValue('ip_address', ev.target.value)}
          />
          <TextField
            label={t('editor.registry_address.label')}
            placeholder={t('editor.registry_address.placeholder')}
            error={errors.registry_address}
            value={values.registry_address}
            onChange={(ev) =>
              setFieldValue('registry_address', ev.target.value)
            }
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
