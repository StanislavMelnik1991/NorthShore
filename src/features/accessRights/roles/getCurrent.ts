import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IRole } from '@entities/types';

export const useGetCurrentRole = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(
    async (id: string | number) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<IRole>>(`/role/${id}`);
        if (data?.data) {
          return data.data;
        } else {
          toast.error(t('errors.getError'));
        }
      } catch (error) {
        toast.error(t('errors.getError'));
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  return {
    getData,
    isLoading,
  };
};
