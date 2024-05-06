import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  PaginationResponse,
  SecuritySlsIntercom,
} from '@entities/types';
import { ListParams } from '@entities/types';

interface Params extends ListParams {
  building_id?: number | string;
  entrance_id?: number | string;
  street_id?: number | string;
  apartment_id?: number | string;
}

interface ResponseDataType extends PaginationResponse {
  intercoms: Array<SecuritySlsIntercom>;
}

export const useGetSecuritySlsIntercomList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<SecuritySlsIntercom>>([]);
  const [total, setTotal] = useState(0);

  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/services/sls_intercoms`,
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
