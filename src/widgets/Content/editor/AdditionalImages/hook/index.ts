import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { IMAGE_TYPES, MAX_IMAGE_SIZE } from '@shared/constants';

type Props = {
  onDrop: (files: File[]) => Promise<void>;
};

export const useEditor = ({ onDrop }: Props) => {
  const { t } = useTranslation('notifications');

  const { getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: IMAGE_TYPES,
    maxSize: 4 * MAX_IMAGE_SIZE,
  });

  return {
    getInputProps,
    open,
    t,
  };
};
