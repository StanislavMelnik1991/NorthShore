import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { LogoutData } from '@entities/types';
import {
  AppRoutes,
  AppRoutesEnum,
  TOKEN_LOCAL_STORAGE_KEY,
} from '@shared/constants';
import { UserContext } from '../context';

interface Params extends LogoutData {
  Authorization: string;
}

export const useUser = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { user, isLoading, setUser, setToken, isAdmin } =
    useContext(UserContext);

  const handleLogOut = useCallback(async () => {
    const logout = async (params: Params) => {
      try {
        const { data } = await axiosApi.get('/auth/logout', { params });
        if (data?.data?.logout) {
          toast.success(t('toast.logoutSuccess'));
          navigate(AppRoutes[AppRoutesEnum.MAIN]());
          return true;
        }
        return false;
      } catch (error) {
        console.error(error);
        toast.error(t('toast.logoutError'));
        return false;
      }
    };
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    if (!token) return;
    const result = await logout({ Authorization: token });
    if (!result) return;
    setUser?.();
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
    setToken?.(null);
  }, [navigate, setToken, setUser, t]);
  return {
    user,
    isLoading,
    setUser,
    handleLogOut,
    isAdmin,
  };
};
