import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  IAnnouncement,
  ListParams,
  PaginationResponse,
} from '@entities/types';

interface ResponseDataType extends PaginationResponse {
  data: Array<IAnnouncement>;
}

export const useGetInfinityAnnouncementsList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const getData = useCallback(
    async (params: ListParams) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/announcements`,
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
