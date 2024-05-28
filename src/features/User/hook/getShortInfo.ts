import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IUserInfoShort } from '@entities/types';

export const useUserInfoShort = () => {
  const { t } = useTranslation('auth');
  const [data, setData] = useState<IUserInfoShort>();

  const getData = useCallback(
    async (id: string | number) => {
      try {
        const { data } = await axiosApi.get<BaseResponse<IUserInfoShort>>(
          `/short_info/${id}`,
        );
        if (data && data.data) {
          setData(data.data);
          return data.data;
        } else {
          toast.error(t('toast.loginError'));
        }
      } catch (error) {
        toast.error(t('toast.loginError'));
      }
    },
    [t],
  );
  return { getData, data };
};
