import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const useSipData = () => {
  const { t } = useTranslation('security');

  const copyText = useCallback(
    (text: string | number = '') =>
      () => {
        navigator.clipboard.writeText(String(text));
        toast(t('toast.copy'));
      },
    [t],
  );

  return { t, copyText };
};
