import { useTranslation } from 'react-i18next';

export const useInfo = () => {
  const { t } = useTranslation('table');

  return { t };
};
