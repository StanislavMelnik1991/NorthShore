import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetCurrentNotification } from '@features/Admin';

export const useCurrentNotification = () => {
  const { t, i18n } = useTranslation('notifications');
  const { id } = useParams<{ id: string }>();
  const { data, getData, isLoading } = useGetCurrentNotification(id as string);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, isLoading, t, i18n };
};
