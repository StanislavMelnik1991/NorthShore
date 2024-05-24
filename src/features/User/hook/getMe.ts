import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IUser } from '@entities/types';

export const useGetMe = () => {
  const { t } = useTranslation('auth');

  const getData = useCallback(async () => {
    try {
      const { data } = await axiosApi.get<BaseResponse<IUser>>('/user');
      if (data && data.data) {
        return data.data;
      } else {
        toast.error(t('toast.loginError'));
      }
    } catch (error) {
      toast.error(t('toast.loginError'));
    }
  }, [t]);
  return { getData };
};
