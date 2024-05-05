import { useTranslation } from 'react-i18next';

export const useAddressSelect = () => {
  const { t } = useTranslation('security');

  return { t };
};
