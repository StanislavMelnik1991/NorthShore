import { FormikErrors } from "formik";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IMAGE_TYPES, MAX_IMAGE_SIZE } from "@shared/constants";

interface Props {
  handleUploadImage(file: File): Promise<string>;
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

export const useCreateNews = ({ handleUploadImage, setFieldValue }: Props) => {
  const onDrop = useCallback(
    async (files: File[]) => {
      if (files.length) {
        const url = await handleUploadImage(files[0]);
        if (url) {
          setFieldValue("cover", url);
        }
      }
    },
    [handleUploadImage, setFieldValue],
  );

  const { getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: IMAGE_TYPES,
    maxSize: 4 * MAX_IMAGE_SIZE,
  });

  return {
    getInputProps,
    open,
  };
};
