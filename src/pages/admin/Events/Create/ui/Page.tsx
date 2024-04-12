import { EventEditor } from "@widgets/Events";
import { PageLayout } from "@widgets/layouts";
import { PageHeader } from "@entities/PageHeader";
import { getRouteAdminEvents } from "@shared/constants";
import { Button } from "@shared/ui";
import { useCreateNews } from "../hook/useCreateNews";
import styles from "./Page.module.scss";

const Page = () => {
  const {
    handleUploadImage,
    setIsDraft,
    errors,
    handleSubmit,
    setFieldValue,
    values,
    t,
  } = useCreateNews();
  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[
          { href: getRouteAdminEvents(), title: t("routes.events") },
          { href: "", title: t("routes.create") },
        ]}
      />
      <form onSubmit={handleSubmit}>
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
                onClick={() => setIsDraft(0)}
              >
                {t("controls.publish")}
              </Button>
              <Button
                className={styles.submitButton}
                size="large"
                variant="secondary"
                type="submit"
                onClick={() => setIsDraft(1)}
              >
                {t("controls.draft")}
              </Button>
            </div>
          }
        />
      </form>
    </PageLayout>
  );
};

export default Page;
