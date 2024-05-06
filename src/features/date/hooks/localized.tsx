import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useLocalizedDate = () => {
  const { t } = useTranslation();

  const getLocalizedMonth = useCallback(
    (month: number) => {
      return t(`month.${month}`);
    },
    [t],
  );

  return {
    getLocalizedMonth,
  };
};
