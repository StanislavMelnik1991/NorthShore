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

interface Props {
  id: string | number;
  initialData?: Array<IRequest>;
}

export const useGetCurrentResidentRequests = ({
  id,
  initialData = [],
}: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsRequestsLoading] = useState(false);
  const [data, setData] = useState<Array<IRequest>>(initialData);
  const [total, setRequestsTotal] = useState(0);

  const getData = useCallback(
    async (params: ListParams) => {
      setIsRequestsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/user/${id}/requests`,
          { params },
        );
        if (data?.data.results) {
          setData(data.data.results);
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
    getData,
    data,
    isLoading,
    total,
  };
};
