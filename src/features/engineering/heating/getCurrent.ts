import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  HeatingParametersType,
  IHeatingPoint,
} from '@entities/types';

export const useGetCurrentHeating = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IHeatingPoint>();

  const getData = useCallback(
    async (id: string | number) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<IHeatingPoint>>(
          `/heating_point/${id}`,
        );
        if (data?.data) {
          Object.entries(data.data.parameters).forEach(([key, value]) => {
            data.data.parameters[key as keyof HeatingParametersType] = Number(
              value.toFixed(1),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) as any;
          });
          setData(data.data);
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
    data,
  };
};
