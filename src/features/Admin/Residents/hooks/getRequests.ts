import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  IRequest,
  ListParams,
  PaginationResponse,
} from '@entities/types';

interface ResponseDataType extends PaginationResponse {
  results: Array<IRequest>;
}

export const useGetCurrentResidentRequests = (id: string) => {
  const { t } = useTranslation();
  const [isRequestsLoading, setIsRequestsLoading] = useState(false);
  const [requestsData, setRequestsData] = useState<Array<IRequest>>([]);
  const [requestsTotal, setRequestsTotal] = useState(0);

  const getRequestsData = useCallback(
    async (params: ListParams) => {
      setIsRequestsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/user/${id}/requests`,
          { params },
        );
        if (data?.data.results) {
          setRequestsData(data.data.results);
          setRequestsTotal(data.data.total_pages);
        } else {
          toast.error(t('errors.getError'));
        }
      } catch (error) {
        toast.error(t('toast.notFound'));
        console.error(error);
      } finally {
        setIsRequestsLoading(false);
      }
    },
    [id, t],
  );

  return {
    getRequestsData,
    requestsData,
    isRequestsLoading,
    requestsTotal,
  };
};
