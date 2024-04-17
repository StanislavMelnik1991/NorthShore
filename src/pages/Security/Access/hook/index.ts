import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetSecurityAccessList } from '@features/security';
import { useOpenSecurityAccess } from '@features/security/access/hooks/open';

export const useSecurityAccessPage = () => {
  const { t } = useTranslation('security');
  const { getData, isLoading, data } = useGetSecurityAccessList();
  const { open } = useOpenSecurityAccess();

  useEffect(() => {
    getData();
  }, [getData]);
  return { t, data, isLoading, open };
};
