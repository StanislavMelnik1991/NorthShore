import {
  SecurityAccessEditor,
  SecurityAccessTypeEditor,
  SecurityAddressEditor,
  SecurityHttpApiEditor,
  SecurityWebApiEditor,
} from '@widgets/Security';
import { PageHeader, PageSkeleton, SubmitActions } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card } from '@shared/ui';
import { useCreateCameraPage } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const { values, errors, setFieldValue, handleSubmit, isValid, t } =
    useCreateCameraPage();

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
            title: t('modules.createAccess'),
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
            title={t('editor.location')}
            errors={errors}
            setFieldValue={setFieldValue}
            values={values}
          />
          <SecurityAccessEditor
            title={t('editor.access')}
            errors={errors}
            setFieldValue={setFieldValue}
            values={values}
          />
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

export default Page;
