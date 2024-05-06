import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const useVideoConfig = () => {
  const { t } = useTranslation('security');

  const copyText = useCallback(
    (text: string) => () => {
      navigator.clipboard.writeText(text);
      toast(t('toast.copy'));
    },
    [t],
  );
  return {
    t,
    copyText,
  };
};
