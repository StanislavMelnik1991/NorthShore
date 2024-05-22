import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  IResidentsRequest,
  ListParams,
  IResident,
} from '@entities/types';

export const useGetResidentsList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<IResident>>([]);
  const [total, setTotal] = useState(0);
  const getData = useCallback(
    async (params: ListParams) => {
      setIsLoading(true);
      try {
        const {
          data: { data },
        } = await axiosApi.get<BaseResponse<IResidentsRequest>>(
          '/users/residents',
          {
            params,
          },
        );
        if (data?.users) {
          setData(data.users);
          setTotal(data.total_pages);
        } else {
          toast.error(t('errors.getError'));
        }
      } catch (error) {
        toast.error(t('toast.listError'));
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
