import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useUploadImage } from '@features/Image';
import { IFile } from '@entities/types';
import { IMAGE_TYPES, MAX_IMAGE_SIZE } from '@shared/constants';

interface Props {
  setImage: (file?: IFile) => void;
}

export const useImageEditor = ({ setImage }: Props) => {
  const { t } = useTranslation('content');
  const { handleUploadImage, loading } = useUploadImage();
  const onDrop = useCallback(
    async (files: File[]) => {
      if (files.length) {
        const newFile = await handleUploadImage(files[0]);
        if (newFile) {
          setImage(newFile);
        }
      }
    },
    [handleUploadImage, setImage],
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
    loading,
    t,
  };
};
