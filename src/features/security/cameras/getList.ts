import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  ListParams,
  PaginationResponse,
  SecurityCamera,
} from '@entities/types';

interface Params extends ListParams {
  building_id?: number;
  entrance_id?: number;
  street_id?: number;
  is_faulty?: 1;
}

interface ResponseDataType extends PaginationResponse {
  cameras: Array<SecurityCamera>;
}

export const useCamerasList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<SecurityCamera>>([]);
  const [total, setTotal] = useState(0);

  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/services/cameras`,
          { params },
        );
        if (data?.data?.cameras) {
          setData(data.data.cameras);
          setTotal(data.data.total_pages);
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
    total,
  };
};
