import { useTranslation } from 'react-i18next';

export const useRequestMainPage = () => {
  const { t } = useTranslation('requests');

  return {
    t,
  };
};
