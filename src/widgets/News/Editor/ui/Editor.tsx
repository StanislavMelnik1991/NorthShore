import classNames from "classnames";
import { FormikErrors } from "formik";
import { Cover } from "@entities/Cover";
import { QuillEditor } from "@entities/QuillEditor";
import { IconStaple } from "@shared/icons";
import { Button, Card, TextField } from "@shared/ui";
import { useCreateNews } from "../hook/useCreateNews";
import styles from "./Editor.module.scss";

interface Props {
  className?: string;
  loading?: boolean;
  handleUploadImage(file: File): Promise<string>;
  controls?: JSX.Element;
  values: {
    title: string;
    html_content: string;
    cover: string;
  };
  errors: FormikErrors<{
    title: string;
    html_content: string;
    cover: string;
  }>;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined,
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          title: string;
          html_content: string;
          cover: string;
        }>
      >;
}

export const NewsEditor = ({
  className,
  handleUploadImage,
  controls,
  errors,
  setFieldValue,
  loading,
  values,
}: Props) => {
  const { getInputProps, open, isLoading, t } = useCreateNews({
    handleUploadImage,
    setFieldValue,
  });
  return (
    <Card
      loading={loading}
      className={classNames(styles.wrapper, className)}
      radius={24}
      flexDirection="column"
      gap={24}
    >
      <input {...getInputProps()} />
      <TextField
        value={values.title}
        error={errors.title}
        onChange={(ev) => setFieldValue("title", ev.target.value)}
        wrapperClassName={styles.textField}
        label={t("editor.title.label")}
        placeholder={t("editor.title.placeholder")}
      />
      {values.cover === "" ? (
        <Button
          variant={"light"}
          className={styles.downloadButton}
          onClick={open}
          loading={isLoading}
        >
          <IconStaple width={24} height={24} />
          {t("editor.cover.label")}
        </Button>
      ) : (
        <Cover src={values.cover} onRemove={() => setFieldValue("cover", "")} />
      )}
      <QuillEditor
        error={errors.html_content}
        label={t("editor.content.label")}
        initialValue={values.html_content}
        setValue={(val) => setFieldValue("html_content", val)}
        uploadImage={handleUploadImage}
      />
      {controls || ""}
    </Card>
  );
};
