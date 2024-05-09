import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IEngineeringResults } from '@entities/types';

interface Params {
  from: number;
  to: number;
  id: number | string;
  variant: 'daily' | 'monthly';
}
export const useGetCurrentEnergyConsumers = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IEngineeringResults>();

  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<IEngineeringResults>>(
          `/power_consumer/statistics`,
          { params },
        );
        if (data?.data) {
          setData(data.data);
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
    data,
    isLoading,
  };
};
