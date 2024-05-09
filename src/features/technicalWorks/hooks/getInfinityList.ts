import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  ITechWork,
  ListParams,
  PaginationResponse,
} from '@entities/types';

interface ResponseDataType extends PaginationResponse {
  data: Array<ITechWork>;
}

export const useGetInfinityTechnicalWorksList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const getData = useCallback(
    async (params: ListParams) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/tech_works`,
          { params },
        );
        if (data?.data?.data) {
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
  };
};
