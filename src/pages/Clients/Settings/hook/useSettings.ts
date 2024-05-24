import { useTranslation } from 'react-i18next';

export const useSettings = () => {
  const { t } = useTranslation('settings');

  return {
    t,
  };
};
