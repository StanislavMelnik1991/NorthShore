import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@features/User';
import { LanguageEnum } from '@shared/constants';

export const useUserLanguage = () => {
  const { t, i18n } = useTranslation('settings');
  const { user, handleUpdate } = useUser();
  const config: Record<LanguageEnum, string> = useMemo(() => {
    return {
      [LanguageEnum.RU]: 'Русский',
      [LanguageEnum.EN]: 'English',
    };
  }, []);
  const [activeLanguage, setActiveLanguage] = useState({
    value: LanguageEnum.RU,
    label: config[LanguageEnum.RU],
  });

  useEffect(() => {
    if (user && user.lang) {
      setActiveLanguage({
        label: config[user.lang],
        value: user.lang,
      });
    }
  }, [config, user]);

  const handleChangeLanguage = useCallback(
    async (val: unknown) => {
      const { label, value } = val as { value: LanguageEnum; label: string };
      i18n.changeLanguage(value);
      await handleUpdate({ lang: value });
      setActiveLanguage({ label, value });
    },
    [handleUpdate, i18n],
  );

  return {
    t,
    options: Object.entries(config).map(([value, label]) => ({ value, label })),
    activeLanguage,
    handleChangeLanguage,
  };
};
