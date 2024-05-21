import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { ISelectOption } from '@entities/components';
import { BaseResponse, IKBaseTheme } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

interface ISelectOptionExtended extends ISelectOption {
  icon: string;
}

export const useKBaseThemesList = () => {
  const { t, i18n } = useTranslation();
  const [options, setOptions] = useState<Array<ISelectOptionExtended>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<ISelectOptionExtended | null>(null);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } =
        await axiosApi.get<BaseResponse<Array<IKBaseTheme>>>(`/faq_themes`);
      if (data?.data) {
        const res: Array<ISelectOptionExtended> = data.data.map(
          ({ id, name, icon }) => ({
            label: name[i18n.language as LanguageEnum] || '',
            value: id,
            icon,
          }),
        );
        setOptions(res);
        setSelected(res[0]);
        return data.data;
      } else {
        toast.error(t('errors.getError'));
      }
    } catch (error) {
      toast.error(t('errors.getError'));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [i18n.language, t]);

  return {
    getData,
    isLoading,
    options,
    selected,
    setSelected,
  };
};
