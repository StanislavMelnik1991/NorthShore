import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  IEngineeringFull,
  ListParams,
  PaginationResponse,
} from '@entities/types';

interface Params extends ListParams {
  building_id?: number;
  street_id?: number;
  state_id?: number;
  type_id?: number;
  power_consumer_type_id?: number;
  power_consumer_operating_mode_id?: number;
  power_consumer_charge_status_id?: number;
}

interface ResponseDataType extends PaginationResponse {
  power_consumers: Array<IEngineeringFull>;
}

export const useGetEnergyList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<IEngineeringFull>>([]);
  const [total, setTotal] = useState(0);

  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/power_consumers`,
          { params },
        );
        if (data?.data?.power_consumers) {
          setData(data.data.power_consumers);
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
