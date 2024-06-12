import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseEntity, BaseResponse } from '@entities/types';

export const useRemoveAccess = () => {
  const { t } = useTranslation();

  const remove = useCallback(
    async (id: string | number) => {
      try {
        const { data } = await axiosApi.delete<BaseResponse<BaseEntity>>(
          `/additional_access_point/${id}`,
        );
        if (data && data.data) {
          toast.success(t('toast.deleteSuccess'));
          return data.data;
        } else {
          toast.error(t('toast.deleteError'));
        }
      } catch (error) {
        console.error(error);
        toast.error(t('toast.deleteError'));
      }
    },
    [t],
  );

  return {
    remove,
  };
};
