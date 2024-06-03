import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  useGetCurrentIntercom,
  useOpenSecurityIntercom,
} from '@features/security';

export const useCurrentIntercomPage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { data, getData, isLoading } = useGetCurrentIntercom(id);
  const { open } = useOpenSecurityIntercom();
  const { t } = useTranslation('security');

  const handleOpen = useCallback(() => {
    open(id, data?.name);
  }, [data?.name, id, open]);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    data,
    isLoading,
    t,
    id,
    handleOpen,
  };
};
