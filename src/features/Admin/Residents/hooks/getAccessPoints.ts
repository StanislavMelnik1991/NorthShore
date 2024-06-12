import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IAccessPoint } from '@entities/types';

export const useGetAccessPoints = (id: string | number) => {
  const { t } = useTranslation();
  const [data, setData] = useState<IAccessPoint>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getAccessPoints = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { data: result },
      } = await axiosApi.get<BaseResponse<IAccessPoint>>(
        `/user/${id}/access_points_intercoms_cameras`,
      );
      setData(result);
      return result;
    } catch (error) {
      toast.error(t('toast.notFound'));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id, t]);

  return {
    getAccessPoints,
    data,
    isLoading,
  };
};
