import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, INews } from '@entities/types';

export const useCurrentEvent = () => {
  const { t, i18n } = useTranslation('events');
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<INews>();

  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get<BaseResponse<INews>>(`news/${id}`)
      .then(({ data }) => {
        if (data.data) {
          setEvent(data.data);
        } else {
          toast.error(t('toast.notFound'));
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(t('toast.notFound'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, t]);
  return { event, isLoading, t, i18n };
};
