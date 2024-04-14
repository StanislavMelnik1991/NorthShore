import { FormikErrors } from "formik";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { IMAGE_TYPES, MAX_IMAGE_SIZE } from "@shared/constants";

interface Props {
  handleUploadImage(file: File): Promise<string>;
  setFieldValue: (
    field: "cover",
    value: string,
    shouldValidate?: boolean | undefined,
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          cover: string;
        }>
      >;
}

export const useCreateMeeting = ({
  handleUploadImage,
  setFieldValue,
}: Props) => {
  const { t } = useTranslation("meetings");
  const [isLoading, setIsLoading] = useState(false);
  const onDrop = useCallback(
    async (files: File[]) => {
      setIsLoading(true);
      if (files.length) {
        const url = await handleUploadImage(files[0]);
        if (url) {
          setFieldValue("cover", url);
        }
      }
      setIsLoading(false);
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
    isLoading,
    t,
  };
};
