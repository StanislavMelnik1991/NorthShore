import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  IElevation,
  ListParams,
  PaginationResponse,
} from '@entities/types';

interface Params extends ListParams {
  building_id?: number;
  entrance_id?: number;
  street_id?: number;
  is_accident?: true;
}

interface ResponseDataType extends PaginationResponse {
  data: Array<IElevation>;
}

export const useGetInfinityElevatorsList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/elevators`,
          { params },
        );
        if (data?.data?.data) {
          setTotal(data.data.total_pages);
          return data.data.data;
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
    total,
  };
};
