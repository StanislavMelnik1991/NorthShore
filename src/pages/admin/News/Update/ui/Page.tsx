import classNames from "classnames";
import { PageLayout } from "@widgets/layouts";
import { NewsEditor } from "@widgets/News";
import { PageHeader } from "@entities/PageHeader";
import { getRouteAdminNews } from "@shared/constants";
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
          { href: getRouteAdminNews(), title: t("routes.news") },
          { href: "", title: t("routes.edit") },
        ]}
      />
      <NewsEditor
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
