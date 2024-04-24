import {
  CameraCreateActions,
  SecurityAccessEditor,
  SecurityAddressEditor,
  SecurityVideoEditor,
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
    initialAddress,
    initialAccessAddress,
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
            title: t('modules.video'),
            href: AppRoutes[AppRoutesEnum.SECURITY_VIDEO](),
          },
          {
            title: t('modules.updateCamera'),
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
          <SecurityVideoEditor
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
