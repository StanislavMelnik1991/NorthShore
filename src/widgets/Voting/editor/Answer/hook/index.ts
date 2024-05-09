import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useDeleteAnswer } from '@features/Admin';
import { useUploadImage } from '@features/Image/hooks/useUploadImage';
import { IFile } from '@entities/types';
import { IMAGE_TYPES, MAX_IMAGE_SIZE } from '@shared/constants';

interface Props {
  votingId: string | number;
  questionId: string | number;
  answerId: string | number;
  handleDeleteAnswer: () => void;
  setImage: (image?: IFile) => void;
}

export const useAnswerEditor = ({
  votingId,
  handleDeleteAnswer,
  answerId,
  questionId,
  setImage,
}: Props) => {
  const { handleDelete: onDelete, loading: deleteLoading } = useDeleteAnswer({
    electionId: votingId,
    questionId,
    variantId: answerId,
  });
  const { handleUploadImage, loading: uploadLoading } = useUploadImage();
  const { t } = useTranslation('voting');

  const handleDelete = useCallback(async () => {
    await onDelete();
    handleDeleteAnswer();
  }, [onDelete, handleDeleteAnswer]);

  const onDrop = useCallback(
    async (newFiles: File[]) => {
      if (newFiles.length) {
        const file = await handleUploadImage(newFiles[0]);
        if (file && file.id) {
          setImage(file);
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

  return { handleDelete, t, deleteLoading, uploadLoading, getInputProps, open };
};
