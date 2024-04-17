import {
  ContentCreateActions,
  ContentEditor,
  ContentWithLanguageSelection,
} from '@widgets/Content';
import { Modal, PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconEyeOpen } from '@shared/icons';
import { Button } from '@shared/ui';
import { useCreateEventsPage } from '../hook';

const Page = () => {
  const {
    handleUploadImage,
    setIsDraft,
    errors,
    handleSubmit,
    setFieldValue,
    values,
    isValid,
    open,
    setOpen,
    t,
  } = useCreateEventsPage();

  const modalConfig = {
    en: {
      created_at: new Date(),
      html: values.html_content_en,
      title: values.title_en,
      date: values.target_date,
    },
    ru: {
      created_at: new Date(),
      html: values.html_content_ru,
      title: values.title_ru,
      date: values.target_date,
    },
  };

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.ADMIN_EVENTS](),
            title: t('routes.events'),
          },
          { href: '', title: t('routes.create') },
        ]}
        controls={
          <Button
            variant="white"
            size="small"
            onClick={() => setOpen(true)}
            disabled={!isValid || values.title_ru === ''}
          >
            <IconEyeOpen width={20} height={20} />
            {t('controls.preview')}
          </Button>
        }
      />
      <form onSubmit={handleSubmit}>
        <Modal
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <ContentWithLanguageSelection config={modalConfig} />
        </Modal>
        <ContentEditor
          handleUploadImage={handleUploadImage}
          errors={errors}
          setFieldValue={setFieldValue}
          values={values}
          controls={
            <ContentCreateActions isValid={isValid} setStatus={setIsDraft} />
          }
        />
      </form>
    </PageSkeleton>
  );
};

export default Page;
