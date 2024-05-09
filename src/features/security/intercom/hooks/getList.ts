import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  PaginationResponse,
  SecurityIntercom,
} from '@entities/types';
import { ListParams } from '@entities/types';

interface Params extends ListParams {
  building_id?: number | string;
  entrance_id?: number | string;
  street_id?: number | string;
  status_id?: number | string;
  type_id?: number | string;
}

interface ResponseDataType extends PaginationResponse {
  intercoms: Array<SecurityIntercom>;
}

export const useGetSecurityIntercomList = () => {
  const { t } = useTranslation('security');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<SecurityIntercom>>([]);
  const [total, setTotal] = useState(0);

  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/intercoms`,
          { params },
        );
        if (data?.data?.intercoms) {
          setData(data.data.intercoms);
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
