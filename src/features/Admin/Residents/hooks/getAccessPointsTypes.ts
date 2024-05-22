import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, BaseEntity } from '@entities/types';

export const useGetAccessPointsTypes = () => {
  const { t } = useTranslation();
  const getAccessPointsTypes = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await axiosApi.get<BaseResponse<BaseEntity[]>>('access_point_types');
      return data;
    } catch (error) {
      toast.error(t('toast.notFound'));
      console.error(error);
    }
  }, [t]);

  return {
    getAccessPointsTypes,
  };
};
