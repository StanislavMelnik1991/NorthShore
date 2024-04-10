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
    // isLoading,
    navigate,
    errors,
    handleSubmit,
    setFieldValue,
    values,
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
        Опубликовать
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
        Обновить
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
        Обновить
      </Button>
      <Button
        className={styles.submitButton}
        size="large"
        variant="secondary"
        type="button"
        onClick={() => navigate(-1)}
      >
        Отмена
      </Button>
    </div>
  );

  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[
          { href: getRouteAdminNews(), title: "Новости" },
          { href: "", title: "Редактирование новости" },
        ]}
      />
      <NewsEditor
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
