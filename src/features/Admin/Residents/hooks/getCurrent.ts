import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IUser } from '@entities/types';

export const useGetCurrentResident = (id: string) => {
  const { t } = useTranslation();
  const [data, setData] = useState<IUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { data: result },
      } = await axiosApi.get<BaseResponse<IUser>>(`/user/${id}/full`);
      if (result) {
        setData(result);
      }
      return result;
    } catch (error) {
      toast.error(t('toast.notFound'));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id, t]);

  return {
    getData,
    isLoading,
    data,
  };
};
