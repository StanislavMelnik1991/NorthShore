import classNames from "classnames";
import { ContentWithLanguageSelection } from "@widgets/Content";
import { MeetingEditor } from "@widgets/Meetings";
import { Modal } from "@widgets/Modal";
import { PageHeader } from "@entities/PageHeader";
import { PageSkeleton } from "@entities/skeletons";
import { getRouteAdminEvents } from "@shared/constants";
import { IconEyeOpen } from "@shared/icons";
import { Button } from "@shared/ui";
import { useUpdateMeetingPage } from "../hook/useUpdateMeetingPage";
import styles from "./Page.module.scss";

const Page = () => {
  const {
    handleUploadImage,
    status,
    isLoading,
    navigate,
    errors,
    handleSubmit,
    setFieldValue,
    handleDelete,
    setStatus,
    values,
    isValid,
    open,
    setOpen,
    t,
  } = useUpdateMeetingPage();

  const modalConfig = {
    en: {
      created_at: new Date(),
      html: values.html_content_en,
      title: values.title_en,
      date: values.target_date,
      link: values.meeting_link,
    },
    ru: {
      created_at: new Date(),
      html: values.html_content_ru,
      title: values.title_ru,
      date: values.target_date,
      link: values.meeting_link,
    },
  };

  const controls = status ? (
    <div className={styles.submitBlock}>
      <Button
        className={styles.submitButton}
        size="large"
        variant="primary"
        type="submit"
      >
        {t("controls.refresh")}
      </Button>
      <Button
        className={styles.submitButton}
        size="large"
        variant="secondary"
        type="button"
        onClick={() => navigate(-1)}
      >
        {t("controls.cancel")}
      </Button>
      <Button
        className={classNames(styles.submitButton, styles.deleteBtn)}
        size="large"
        variant="danger"
        type="button"
        onClick={handleDelete}
      >
        {t("controls.delete")}
      </Button>
    </div>
  ) : (
    <div className={styles.submitBlock}>
      <Button
        className={styles.submitButton}
        size="large"
        variant="primary"
        type="submit"
        onClick={() => {
          setStatus(1);
        }}
      >
        {t("controls.publish")}
      </Button>
      <Button
        className={styles.submitButton}
        size="large"
        variant="secondary"
        type="submit"
      >
        {t("controls.refresh")}
      </Button>
      <Button
        className={classNames(styles.submitButton, styles.deleteBtn)}
        size="large"
        variant="danger"
        type="button"
        onClick={handleDelete}
      >
        {t("controls.delete")}
      </Button>
    </div>
  );

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          { href: getRouteAdminEvents(), title: t("routes.meetings") },
          { href: "", title: t("routes.edit") },
        ]}
        controls={
          <Button
            variant="white"
            size="small"
            onClick={() => setOpen(true)}
            disabled={!isValid}
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
        <MeetingEditor
          loading={isLoading}
          handleUploadImage={handleUploadImage}
          errors={errors}
          setFieldValue={setFieldValue}
          values={values}
          controls={controls}
        />
      </form>
    </PageSkeleton>
  );
};

export default Page;
