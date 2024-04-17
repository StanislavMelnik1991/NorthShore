import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, INews } from '@entities/types';

export const useGetCurrentMeeting = (id: string) => {
  const { t } = useTranslation('meetings');
  const getData = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await axiosApi.get<BaseResponse<INews>>(`/news/${id}`);
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
