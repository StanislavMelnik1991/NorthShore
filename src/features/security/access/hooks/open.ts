import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse } from '@entities/types';

export const useOpenSecurityAccess = () => {
  const { t } = useTranslation('security');

  const open = useCallback(
    async (id: number | string, name?: string) => {
      try {
        await axiosApi.get<BaseResponse<undefined>>(`/access_point/${id}/open`);
        toast.success(`${name} ${t('toast.openSuccess')}`);
      } catch (error) {
        toast.error(`${t('toast.openError')} ${name}`);
        console.error(error);
      }
    },
    [t],
  );

  return { open };
};
