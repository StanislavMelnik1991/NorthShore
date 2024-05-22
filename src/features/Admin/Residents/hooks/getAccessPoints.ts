import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IAccessPoint } from '@entities/types';

export const useGetAccessPoints = (id: string) => {
  const { t } = useTranslation();
  const getAccessPoints = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await axiosApi.get<BaseResponse<IAccessPoint>>(
        `/user/${id}/access_points_intercoms_cameras`,
      );
      return data;
    } catch (error) {
      toast.error(t('toast.notFound'));
      console.error(error);
    }
  }, [id, t]);

  return {
    getAccessPoints,
  };
};
