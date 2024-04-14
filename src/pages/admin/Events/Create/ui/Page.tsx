import { ContentWithLanguageSelection } from "@widgets/Content";
import { EventEditor } from "@widgets/Events";
import { Modal } from "@widgets/Modal";
import { PageHeader } from "@entities/PageHeader";
import { PageSkeleton } from "@entities/skeletons";
import { getRouteAdminEvents } from "@shared/constants";
import { IconEyeOpen } from "@shared/icons";
import { Button } from "@shared/ui";
import { useCreateEventsPage } from "../hook";
import styles from "./Page.module.scss";

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
          { href: getRouteAdminEvents(), title: t("routes.events") },
          { href: "", title: t("routes.create") },
        ]}
        controls={
          <Button
            variant="white"
            size="small"
            onClick={() => setOpen(true)}
            disabled={!isValid || values.title_ru === ""}
          >
            <IconEyeOpen width={20} height={20} />
            {t("controls.preview")}
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
        <EventEditor
          handleUploadImage={handleUploadImage}
          errors={errors}
          setFieldValue={setFieldValue}
          values={values}
          controls={
            <div className={styles.submitBlock}>
              <Button
                className={styles.submitButton}
                size="large"
                variant="primary"
                type="submit"
                disabled={!isValid}
                onClick={() => setIsDraft(1)}
              >
                {t("controls.publish")}
              </Button>
              <Button
                className={styles.submitButton}
                size="large"
                variant="secondary"
                type="submit"
                disabled={!isValid}
                onClick={() => setIsDraft(0)}
              >
                {t("controls.draft")}
              </Button>
            </div>
          }
        />
      </form>
    </PageSkeleton>
  );
};

export default Page;
