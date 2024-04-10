import { PageHeader } from "@entities/PageHeader";
import { QuillEditor } from "@entities/QuillEditor";
import { getRouteAdminNews } from "@shared/constants";
import { IconStaple } from "@shared/icons";
import { PageLayout } from "@shared/layouts";
import { Button, Card, TextField } from "@shared/ui";
import { useCreateNews } from "../hook/useCreateNews";
import styles from "./CreateNewsPage.module.scss";

const Page = () => {
  const { errors, handleSubmit, setFieldValue, values, handleUploadImage } =
    useCreateNews();
  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[
          { href: getRouteAdminNews(), title: "Новости" },
          { href: "", title: "Создание новости" },
        ]}
      />
      <Card className={styles.card} radius={24} flexDirection="column" gap={24}>
        <TextField
          value={values.title}
          error={errors.title}
          onChange={(ev) => setFieldValue("title", ev.target.value)}
          wrapperClassName={styles.textField}
          label="Заголовок"
          placeholder="Заголовок новости"
        />
        <Button variant={"light"} className={styles.downloadButton}>
          <IconStaple width={24} height={24} />
          Изображение обложки
        </Button>
        <QuillEditor
          error={errors.html_content}
          label="Текст новости"
          initialValue={values.html_content}
          setValue={(val) => setFieldValue("html_content", val)}
          uploadImage={handleUploadImage}
        />
        <div className={styles.submitBlock}>
          <Button size="large" variant="primary" onClick={handleSubmit(1)}>
            Опубликовать
          </Button>
          <Button size="large" variant="secondary" onClick={handleSubmit(0)}>
            Сохранить черновик
          </Button>
        </div>
      </Card>
    </PageLayout>
  );
};

export default Page;
