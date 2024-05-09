import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  IVoting,
  ListParams,
  PaginationResponse,
} from '@entities/types';

interface Params extends ListParams {
  from?: Date;
  to?: Date;
  status_id?: number;
}

interface ResponseDataType extends PaginationResponse {
  data: Array<IVoting>;
}

export const useGetUserVotingList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<IVoting>>([]);
  const [total, setTotal] = useState(0);

  const getData = useCallback(
    async ({ from, to, ...params }: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/elections`,
          {
            params: {
              ...params,
              from: from ? Math.ceil(from.getTime() / 1000) : undefined,
              to: to ? Math.ceil(to.getTime() / 1000) : undefined,
            },
          },
        );
        if (data?.data?.data) {
          setData(data.data.data);
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
