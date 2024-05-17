import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  ILoyalty,
  ListParams,
  PaginationResponse,
} from '@entities/types';

interface ResponseDataType extends PaginationResponse {
  data: Array<ILoyalty>;
}

interface Params extends ListParams {
  from?: number;
  to?: number;
  status_id?: number;
  type_id?: number;
  nature_id?: number;
}

export const useGetInfinityLoyaltyList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/loyalty_programs`,
          { params },
        );
        if (data?.data?.data) {
          setTotal(data.data.total_pages);
          if (params.page) {
            setHasMore(params.page < data.data.total_pages);
          }
          return data.data.data;
        } else {
          setHasMore(false);
          toast.error(t('errors.getError'));
        }
      } catch (error) {
        setHasMore(false);
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
    hasMore,
    total,
  };
};
