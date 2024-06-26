import { useTranslation } from 'react-i18next';

export const useApplicationsMainPage = () => {
  const { t } = useTranslation('invocation');

  return {
    t,
  };
};
