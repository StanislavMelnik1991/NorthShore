import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IVoting } from '@entities/types';

export const useDeleteVoting = () => {
  const { t } = useTranslation();

  const deleteVoting = useCallback(
    async (id: string | number) => {
      try {
        const {
          data: { data },
        } = await axiosApi.delete<BaseResponse<IVoting>>(`/election/${id}`);
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
    deleteVoting,
  };
};
