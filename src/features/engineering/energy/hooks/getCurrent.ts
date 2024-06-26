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

interface ExtendedIEngineeringResults extends IEngineeringResults {
  delta?: IEngineeringResults['results'];
}

export const useGetCurrentEnergyConsumer = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ExtendedIEngineeringResults>();
  const [total, setTotal] = useState<number>();

  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<IEngineeringResults>>(
          `/power_consumer/statistics`,
          { params },
        );
        if (data?.data) {
          const result: ExtendedIEngineeringResults = { ...data.data };
          result.delta = data.data.results.map((el, index, arr) => {
            if (!el) {
              return el;
            }
            if (index === 0) {
              return { ...el, current_value: 0 };
            } else {
              return {
                ...el,
                current_value:
                  el?.current_value && arr[index - 1]?.current_value
                    ? el?.current_value - arr[index - 1]?.current_value
                    : 0,
              };
            }
          });
          const resultsArr = data.data.results.filter((el) => !!el);
          const total =
            resultsArr[resultsArr.length - 1].current_value -
            resultsArr[0].current_value;
          setTotal(total);
          setData(result);
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
    total,
    getData,
    data,
    isLoading,
  };
};
