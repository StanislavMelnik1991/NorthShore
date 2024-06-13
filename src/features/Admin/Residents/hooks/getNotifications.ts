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

interface ResponseDataType extends PaginationResponse {
  notifications: Array<INotification>;
}

interface Props {
  id: string | number;
  initialData?: INotification[];
}

export const useGetCurrentResidentNotifications = ({
  id,
  initialData = [],
}: Props) => {
  const { t } = useTranslation();
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(false);
  const [notificationsData, setNotificationsData] =
    useState<Array<INotification>>(initialData);
  const [notificationsTotal, setNotificationsTotal] = useState(0);

  const getNotificationsData = useCallback(
    async (params: ListParams) => {
      setIsNotificationsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/user/${id}/notifications`,
          { params },
        );
        if (data?.data.notifications) {
          setNotificationsData(data.data.notifications);
          setNotificationsTotal(data.data.total_pages);
        } else {
          toast.error(t('errors.getError'));
        }
      } catch (error) {
        toast.error(t('toast.notFound'));
        console.error(error);
      } finally {
        setIsNotificationsLoading(false);
      }
    },
    [id, t],
  );

  return {
    getNotificationsData,
    notificationsData,
    isNotificationsLoading,
    notificationsTotal,
  };
};
