import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  INotification,
  ListParams,
  PaginationResponse,
} from '@entities/types';

interface Params extends ListParams {
  from?: Date;
  to?: Date;
}

interface ResponseDataType extends PaginationResponse {
  notifications: Array<INotification>;
}

export const useGetUserNotificationsList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<INotification>>([]);
  const [total, setTotal] = useState(0);

  const getData = useCallback(
    async ({ from, to, ...params }: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/all_notifications`,
          {
            params: {
              ...params,
              from: from ? Math.ceil(from.getTime() / 1000) : undefined,
              to: to ? Math.ceil(to.getTime() / 1000) : undefined,
            },
          },
        );
        if (data?.data?.notifications) {
          setData(data.data.notifications);
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
