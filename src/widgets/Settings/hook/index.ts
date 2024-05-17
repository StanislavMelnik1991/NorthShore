import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IUser } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

export const useSettings = () => {
  const { t, i18n } = useTranslation('settings');
  const [lang, setLang] = useState<LanguageEnum>(i18n.language as LanguageEnum);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeLang = async (val: LanguageEnum) => {
    try {
      setIsLoading(true);
      await axiosApi.post<BaseResponse<IUser>>('/user', {
        lang: val,
      });
      i18n.changeLanguage(val);
      setLang(val);
    } catch (err) {
      toast.error(t('errors.langError'));
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    t,
    lang,
    handleChangeLang,
  };
};
