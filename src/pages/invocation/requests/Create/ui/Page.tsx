import { RequestContentEditor } from '@widgets/invocation';
import { PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { useCreateEventsPage } from '../hook';
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
  } = useCreateEventsPage();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.REQUESTS](),
            title: t('routes.requests'),
          },
          { href: '', title: t('routes.create_request') },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <RequestContentEditor
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
