import { ApplicationsContentEditor } from '@widgets/invocation';
import { PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { useCreateApplicationPage } from '../hook';
import { ContentCreateActions } from './ContentCreateActions';

const Page = () => {
  const {
    handleUploadImage,
    errors,
    handleSubmit,
    setFieldValue,
    values,
    isValid,
    t,
  } = useCreateApplicationPage();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.APPLICATIONS](),
            title: t('routes.applications'),
          },
          { title: t('routes.create_application') },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <ApplicationsContentEditor
          handleUploadImage={handleUploadImage}
          errors={errors}
          setFieldValue={setFieldValue}
          values={values}
          controls={<ContentCreateActions isValid={isValid} />}
        />
      </form>
    </PageSkeleton>
  );
};

export default Page;
