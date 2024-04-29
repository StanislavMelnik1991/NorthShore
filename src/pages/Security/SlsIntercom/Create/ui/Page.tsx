import { CameraCreateActions, SlsIntercomEditor } from '@widgets/Security';
import { PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card } from '@shared/ui';
import { useCreateIntercomPage } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const { values, errors, setFieldValue, handleSubmit, isValid, t } =
    useCreateIntercomPage();

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
            title: t('modules.createSslIntercom'),
          },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <Card
          className={styles.card}
          radius={24}
          flexDirection="column"
          gap={0}
        >
          <SlsIntercomEditor
            errors={errors}
            setFieldValue={setFieldValue}
            values={values}
          />
          <CameraCreateActions
            submitText={t('actions.add')}
            className={styles.actions}
            isValid={isValid}
          />
        </Card>
      </form>
    </PageSkeleton>
  );
};

export default Page;
