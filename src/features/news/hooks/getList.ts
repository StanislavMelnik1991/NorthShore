import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  INews,
  ListParams,
  PaginationResponse,
} from '@entities/types';

interface Params extends ListParams {}

interface ResponseDataType extends PaginationResponse {
  news: Array<INews>;
}

export const useGetUserNewsList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<INews>>([]);
  const [total, setTotal] = useState(0);

  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/news`,
          { params },
        );
        if (data?.data?.news) {
          setData(data.data.news);
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
