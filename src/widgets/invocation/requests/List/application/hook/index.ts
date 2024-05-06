import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetApplicationsList } from '@features/invocation';

export const useList = (isActual: boolean) => {
  const { getData, data } = useGetApplicationsList(isActual);
  const { t } = useTranslation('invocation');

  useEffect(() => {
    getData();
  }, [getData]);
  return { data, t };
};
