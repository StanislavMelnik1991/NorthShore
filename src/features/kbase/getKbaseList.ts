import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IKBase } from '@entities/types';

interface Params {
  search_query?: string;
}

export const useGetKBaseList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<Array<IKBase>>>(
          `/faq`,
          { params },
        );
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
