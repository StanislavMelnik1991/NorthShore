import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useUploadImage } from '@features/Image';
import { useUser } from '@features/User';
import { IMAGE_TYPES, MAX_IMAGE_SIZE } from '@shared/constants';

export const useAvatar = () => {
  const { t } = useTranslation('settings');
  const { user, handleUpdate, setUser } = useUser();
  const { handleUploadImage } = useUploadImage();

  const onDrop = useCallback(
    async (files: File[]) => {
      if (files.length) {
        const newFile = await handleUploadImage(files[0]);
        if (newFile) {
          if (user) {
            setUser?.({ ...user, avatar: newFile.url });
          }
          handleUpdate({ avatar: newFile.url });
        }
      }
    },
    [handleUpdate, handleUploadImage, setUser, user],
  );

  const handleRemove = useCallback(async () => {
    if (user) {
      setUser?.({ ...user, avatar: undefined });
    }
    handleUpdate({ avatar: '' });
  }, [handleUpdate, setUser, user]);

  const { getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: IMAGE_TYPES,
    maxSize: 4 * MAX_IMAGE_SIZE,
  });

  return { t, user, getInputProps, open, handleRemove };
};
