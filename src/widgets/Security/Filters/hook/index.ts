import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStreetsList } from '@features/address';

export const useSecurityFilters = () => {
  const { data, getData, isLoading } = useStreetsList();
  const { t } = useTranslation('security');

  useEffect(() => {
    getData();
  }, [getData]);

  return { t, data, isLoading };
};
