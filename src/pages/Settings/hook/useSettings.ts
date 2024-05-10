import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IUser, ISetting } from '@entities/types';

export const useSettings = () => {
  const { t } = useTranslation('settings');
  const [data, setData] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);
  const [userConfig, setUserConfig] = useState<Array<ISetting>>([]);

  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get<BaseResponse<IUser>>('user')
      .then(({ data: { data } }) => {
        setData(data);
        setUserConfig([
          {
            title: t('blocks.titles.profile_data'),
            fields: [
              {
                name: t('blocks.titles.profile_photo'),
                isAvatar: true,
                value: data.avatar,
                editable: true,
                deletable: true,
                deleteControl: 'small',
              },
              {
                name: 'E-mail',
                editable: true,
                deletable: false,
                value: data.email,
              },
              {
                name: t('blocks.titles.phone_number'),
                editable: true,
                deletable: false,
                value: data.phone_number,
              },
            ],
          },
          {
            title: t('blocks.titles.account_management'),
            fields: [
              {
                name: t('blocks.titles.password'),
                editable: true,
                deletable: false,
                value: '',
                isPassword: true,
              },
              {
                name: t('blocks.titles.account_deleting'),
                editable: false,
                deletable: true,
                description: t('blocks.descriptions.account_deleting'),
              },
              {
                name: t('blocks.titles.language'),
                editable: false,
                deletable: false,
                values: [
                  { value: 'ru', label: 'Русский' },
                  { value: 'en', label: 'English' },
                ],
                description: t('blocks.descriptions.language'),
              },
            ],
          },
        ]);
      })
      .catch(() => {
        toast.error(t('errors.getError'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [t]);

  return {
    isLoading,
    data,
    t,
    userConfig,
  };
};
