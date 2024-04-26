import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  PaginationResponse,
  SecurityAccess,
} from '@entities/types';
import { ListParams } from '@entities/types';

interface Params extends ListParams {
  building_id?: number | string;
  entrance_id?: number | string;
  street_id?: number | string;
  is_faulty?: 1;
  type_id?: number | string;
}

interface ResponseDataType extends PaginationResponse {
  access_points: Array<SecurityAccess>;
}

export const useGetSecurityAccessList = () => {
  const { t } = useTranslation('security');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<SecurityAccess>>([]);
  const [total, setTotal] = useState(0);

  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/access_points`,
          { params },
        );
        if (data?.data?.access_points) {
          setData(data.data.access_points);
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
