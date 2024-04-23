import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IStreet } from '@entities/types';

export const useStreetsList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<IStreet>>([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const {
        data: { data: newData },
      } = await axiosApi.get<BaseResponse<Array<IStreet>>>('/services/streets');
      if (newData) {
        setData(newData);
      } else {
        toast.error(t('errors.getError'));
      }
    } catch (error) {
      toast.error(t('errors.getError'));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  return {
    getData,
    data,
    isLoading,
  };
};
