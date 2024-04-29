import {
  CameraCreateActions,
  SecurityHttpApiEditor,
  SecurityIntercomDataEditor,
  SecurityWebApiEditor,
} from '@widgets/Security';
import { PageHeader, PageSkeleton } from '@entities/components';
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
            title: t('modules.intercom'),
            href: AppRoutes[AppRoutesEnum.SECURITY_INTERCOM](),
          },
          {
            title: t('modules.updateIntercom'),
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
          <SecurityIntercomDataEditor
            errors={errors}
            setFieldValue={setFieldValue}
            values={values}
            initialAddress={initialAddress}
          />
          <SecurityWebApiEditor
            title={t('editor.webData')}
            errors={errors}
            setFieldValue={setFieldValue}
            values={values}
          />
          <SecurityHttpApiEditor
            title={t('editor.httpData')}
            errors={errors}
            setFieldValue={setFieldValue}
            values={values}
          />
          <CameraCreateActions
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
