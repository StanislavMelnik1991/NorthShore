import { PageLayout } from "@widgets/layouts";
import { NewsEditor } from "@widgets/News";
import { PageHeader } from "@entities/PageHeader";
import { getRouteAdminNews } from "@shared/constants";
import { Button } from "@shared/ui";
import { useCreateNews } from "../hook/useCreateNews";
import styles from "./CreateNewsPage.module.scss";

const Page = () => {
  const {
    handleUploadImage,
    setIsDraft,
    errors,
    handleSubmit,
    setFieldValue,
    values,
  } = useCreateNews();
  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[
          { href: getRouteAdminNews(), title: "Новости" },
          { href: "", title: "Создание новости" },
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
                onClick={() => setIsDraft(1)}
              >
                Опубликовать
              </Button>
              <Button
                className={styles.submitButton}
                size="large"
                variant="secondary"
                type="submit"
                onClick={() => setIsDraft(0)}
              >
                Сохранить черновик
              </Button>
            </div>
          }
        />
      </form>
    </PageLayout>
  );
};

export default Page;
