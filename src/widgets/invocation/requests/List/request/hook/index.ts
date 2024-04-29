import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetRequestsList } from '@features/invocation';

export const useList = (isActual: boolean) => {
  const { getData, data } = useGetRequestsList(isActual);
  const { t } = useTranslation('invocation');

  useEffect(() => {
    getData();
  }, [getData]);
  return { data, t };
};
