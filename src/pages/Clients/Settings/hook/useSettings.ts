import { useTranslation } from 'react-i18next';
import { useUser } from '@features/User';

export const useSettings = () => {
  const { t } = useTranslation('settings');
  const { isLoading } = useUser();

  return {
    t,
    isLoading,
  };
};
