import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IVoting } from '@entities/types';

export const useGetCurrentVoting = (id: string) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await axiosApi.get<BaseResponse<IVoting>>(
        `/election/${id}`,
      );
      if (result.data.data) {
        return result.data.data;
      } else {
        toast.error(t('errors.getError'));
      }
    } catch (error) {
      toast.error(t('errors.getError'));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id, t]);

  return {
    getData,
    isLoading,
  };
};
