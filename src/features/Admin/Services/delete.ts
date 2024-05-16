import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IUserService } from '@entities/types';

export const useDeleteService = () => {
  const { t } = useTranslation();

  const handleDelete = useCallback(
    async (id: string | number) => {
      try {
        const {
          data: { data },
        } = await axiosApi.delete<BaseResponse<IUserService>>(
          `/user_service/${id}`,
        );
        toast.success(t('toast.deleteSuccess'));
        return data;
      } catch (error) {
        console.error(error);
        toast.error(t('toast.deleteError'));
      }
    },
    [t],
  );

  return {
    handleDelete,
  };
};
