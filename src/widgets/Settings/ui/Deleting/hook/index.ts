import { useTranslation } from 'react-i18next';
import { useUser } from '@features/User';

export const useUserDeleting = () => {
  const { t } = useTranslation('settings');
  const { user } = useUser();

  return {
    t,
    user,
  };
};
