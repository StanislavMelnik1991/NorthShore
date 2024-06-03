import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetCurrentAccess, useOpenSecurityAccess } from '@features/security';

export const useCreateCameraPage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { data, getData, isLoading } = useGetCurrentAccess(id);
  const { t } = useTranslation('security');

  const { open } = useOpenSecurityAccess();

  useEffect(() => {
    getData();
  }, [getData]);

  const handleOpen = useCallback(() => {
    open(id, data?.name);
  }, [data?.name, id, open]);

  return {
    data,
    isLoading,
    t,
    id,
    handleOpen,
  };
};
