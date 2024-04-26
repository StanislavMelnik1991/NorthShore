import {
  CameraCreateActions,
  SecurityAccessEditor,
  SecurityAccessTypeEditor,
  SecurityAddressEditor,
  SecurityHttpApiEditor,
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
    initialAccessAddress,
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
            title: t('modules.access'),
            href: AppRoutes[AppRoutesEnum.SECURITY_ACCESS](),
          },
          {
            title: t('modules.updateAccess'),
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
          <SecurityAccessTypeEditor
            errors={errors}
            setFieldValue={setFieldValue}
            values={values}
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
          <SecurityAddressEditor
            initialAddress={initialAddress}
            title={t('editor.location')}
            errors={errors}
            setFieldValue={setFieldValue}
            values={values}
          />
          <SecurityAccessEditor
            initialAccess={initialAccessAddress}
            title={t('editor.access')}
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
