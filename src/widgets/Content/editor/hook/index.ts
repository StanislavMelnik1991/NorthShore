import { FormikErrors } from 'formik';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { IFile } from '@entities/types';
import { IMAGE_TYPES, MAX_IMAGE_SIZE } from '@shared/constants';

interface Props {
  handleUploadImage(file: File): Promise<IFile | undefined>;
  setFieldValue: (
    field: 'cover',
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

export const useEditorWidget = ({
  handleUploadImage,
  setFieldValue,
}: Props) => {
  const { t } = useTranslation('meetings');
  const [isLoading, setIsLoading] = useState(false);
  const onDrop = useCallback(
    async (files: File[]) => {
      setIsLoading(true);
      if (files.length) {
        const newFile = await handleUploadImage(files[0]);
        if (newFile) {
          setFieldValue('cover', newFile.url);
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
