import classNames from "classnames";
import { PageLayout } from "@widgets/layouts";
import { MeetingEditor } from "@widgets/Meetings";
import { PageHeader } from "@entities/PageHeader";
import { getRouteAdminEvents } from "@shared/constants";
import { Button } from "@shared/ui";
import { useCreateNews } from "../hook/useUpdateNews";
import styles from "./Page.module.scss";

const Page = () => {
  const {
    handleUploadImage,
    isDraft,
    isLoading,
    navigate,
    errors,
    handleSubmit,
    setFieldValue,
    handleDelete,
    values,
    t,
  } = useCreateNews();

  const controls = isDraft ? (
    <div className={styles.submitBlock}>
      <Button
        className={styles.submitButton}
        size="large"
        variant="primary"
        type="button"
        onClick={() => {
          handleSubmit();
        }}
      >
        {t("controls.publish")}
      </Button>
      <Button
        className={styles.submitButton}
        size="large"
        variant="secondary"
        type="button"
        onClick={() => {
          handleSubmit(0);
        }}
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
  ) : (
    <div className={styles.submitBlock}>
      <Button
        className={styles.submitButton}
        size="large"
        variant="primary"
        type="button"
        onClick={() => {
          handleSubmit();
        }}
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
  );

  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[
          { href: getRouteAdminEvents(), title: t("routes.meetings") },
          { href: "", title: t("routes.edit") },
        ]}
      />
      <MeetingEditor
        loading={isLoading}
        handleUploadImage={handleUploadImage}
        errors={errors}
        setFieldValue={setFieldValue}
        values={values}
        controls={controls}
      />
    </PageLayout>
  );
};

export default Page;
