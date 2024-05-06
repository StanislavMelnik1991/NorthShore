import { SlsIntercomEditor } from '@widgets/Security';
import { PageHeader, PageSkeleton, SubmitActions } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card } from '@shared/ui';
import { useCreateCameraPage } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    isValid,
    t,
    isLoading,
    initialAddress,
  } = useCreateCameraPage();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            title: t('title'),
            href: AppRoutes[AppRoutesEnum.SECURITY](),
          },
          {
            title: t('modules.sls_intercom'),
            href: AppRoutes[AppRoutesEnum.SECURITY_SLS_INTERCOM](),
          },
          {
            title: t('modules.updateSslIntercom'),
          },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <Card
          loading={isLoading}
          className={styles.card}
          radius={24}
          flexDirection="column"
          gap={0}
        >
          <SlsIntercomEditor
            initialAddress={initialAddress}
            errors={errors}
            setFieldValue={setFieldValue}
            values={values}
          />
          <SubmitActions
            submitText={t('actions.update')}
            className={styles.actions}
            isValid={isValid}
          />
        </Card>
      </form>
    </PageSkeleton>
  );
};

export default Page;
