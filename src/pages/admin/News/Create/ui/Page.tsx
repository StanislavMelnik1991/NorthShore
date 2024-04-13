import { PageLayout } from "@widgets/layouts";
import { NewsEditor } from "@widgets/News";
import { PageHeader } from "@entities/PageHeader";
import { getRouteAdminNews } from "@shared/constants";
import { Button } from "@shared/ui";
import { useCreateNewsPage } from "../hook/useCreateNews";
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
    t,
  } = useCreateNewsPage();
  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[
          { href: getRouteAdminNews(), title: t("routes.news") },

          { href: "", title: t("routes.create") },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <NewsEditor
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
    </PageLayout>
  );
};

export default Page;
