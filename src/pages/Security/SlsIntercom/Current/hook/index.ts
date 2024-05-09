import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetCurrentSlsIntercom } from '@features/security';

export const useCurrentIntercomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, getData, isLoading } = useGetCurrentSlsIntercom(id as string);
  const { t } = useTranslation('securityCurrent');

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    data,
    isLoading,
    t,
    id,
  };
};
