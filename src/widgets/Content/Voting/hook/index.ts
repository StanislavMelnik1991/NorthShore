import { ru, enGB } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

export const useVoting = () => {
  const { t, i18n } = useTranslation('voting');
  return { t, dateLocale: i18n.language === 'en' ? enGB : ru };
};
