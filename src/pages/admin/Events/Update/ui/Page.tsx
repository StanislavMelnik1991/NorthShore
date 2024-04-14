import classNames from "classnames";
import { ContentWithLanguageSelection } from "@widgets/Content";
import { EventEditor } from "@widgets/Events";
import { Modal } from "@widgets/Modal";
import { PageHeader } from "@entities/PageHeader";
import { PageSkeleton } from "@entities/skeletons";
import { getRouteAdminEvents } from "@shared/constants";
import { IconEyeOpen } from "@shared/icons";
import { Button } from "@shared/ui";
import { useCreateEventPage } from "../hook";
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
  } = useCreateEventPage();

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

  const controls = status ? (
    <div className={styles.submitBlock}>
      <Button
        className={styles.submitButton}
        size="large"
        variant="primary"
        type="submit"
        disabled={!isValid}
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
        disabled={!isValid}
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
        disabled={!isValid}
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
          { href: getRouteAdminEvents(), title: t("routes.events") },
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
        <EventEditor
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
