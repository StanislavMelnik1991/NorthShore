import { useTranslation } from 'react-i18next';

export const useVideoList = () => {
  const { t } = useTranslation('security');
  return { t };
};
