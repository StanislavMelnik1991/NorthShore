import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse } from '@entities/types';

export const useRemoveSecurityAccess = () => {
  const { t } = useTranslation();

  const onDelete = useCallback(
    async (id: number | string, name?: string) => {
      try {
        await axiosApi.delete<BaseResponse<undefined>>(`/access_point/${id}`);
        toast.success(`${name} ${t('toast.deleteSuccess')}`);
      } catch (error) {
        toast.error(`${t('toast.deleteError')} ${name}`);
        console.error(error);
      }
    },
    [t],
  );

  return { onDelete };
};
