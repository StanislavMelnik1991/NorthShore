import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { IFile } from '@entities/types';
import { IMAGE_TYPES, MAX_IMAGE_SIZE } from '@shared/constants';

interface Props {
  handleUploadImage(file: File): Promise<IFile | undefined>;
  setFieldValue(name: 'files', val: Array<IFile>): void;
  files: Array<IFile>;
}

export const useEditorWidget = ({
  handleUploadImage,
  files,
  setFieldValue,
}: Props) => {
  const { t } = useTranslation('invocation');
  const [isLoading, setIsLoading] = useState(false);
  const onDrop = useCallback(
    async (newFiles: File[]) => {
      setIsLoading(true);
      if (newFiles.length) {
        const file = await handleUploadImage(newFiles[0]);
        if (file && file.id) {
          setFieldValue('files', [...files, file]);
        }
      }
      setIsLoading(false);
    },
    [files, handleUploadImage, setFieldValue],
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFieldValue('files', newFiles);
    },
    [files, setFieldValue],
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
    handleRemoveImage,
    t,
  };
};
