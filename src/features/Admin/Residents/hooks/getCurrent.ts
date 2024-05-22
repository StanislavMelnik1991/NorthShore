import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IUser } from '@entities/types';

export const useGetCurrentResident = (id: string) => {
  const { t } = useTranslation();
  const getData = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await axiosApi.get<BaseResponse<IUser>>(`/user/${id}/full`);
      return data;
    } catch (error) {
      toast.error(t('toast.notFound'));
      console.error(error);
    }
  }, [id, t]);

  return {
    getData,
  };
};
