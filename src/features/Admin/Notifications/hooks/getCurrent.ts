import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, INews } from '@entities/types';

export const useGetCurrentNotification = (id: string) => {
  const { t } = useTranslation();
  const getData = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await axiosApi.get<BaseResponse<INews>>(`/news/${id}`);
      return data;
    } catch (error) {
      toast.error(t('errors.getError'));
      console.error(error);
    }
  }, [id, t]);

  return {
    getData,
  };
};
