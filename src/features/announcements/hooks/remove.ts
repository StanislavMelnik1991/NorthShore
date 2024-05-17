import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IAnnouncement } from '@entities/types';

export const useRemoveAnnouncement = () => {
  const { t } = useTranslation();

  const handleRemove = useCallback(
    async (id: string | number) => {
      try {
        await axiosApi.delete<BaseResponse<IAnnouncement>>(
          `/announcement/${id}`,
        );
        toast.success(t('toast.deleteSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(t('toast.deleteError'));
      }
    },
    [t],
  );

  return {
    handleRemove,
  };
};
