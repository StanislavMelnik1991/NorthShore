import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { LogoutData } from '@entities/types';
import {
  AppRoutes,
  AppRoutesEnum,
  ROLES_STAFF,
  TOKEN_LOCAL_STORAGE_KEY,
} from '@shared/constants';
import { UserContext } from '../context';
import { useGetMe } from './getMe';
import { useUpdateMe } from './updateMe';

interface Params extends LogoutData {
  Authorization: string;
}

export const useUser = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { user, isLoading, setUser, setToken, setIsLoading } =
    useContext(UserContext);
  const { getData } = useGetMe();
  const { update } = useUpdateMe();

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

  const handleRefreshData = useCallback(async () => {
    setIsLoading?.(true);
    const data = await getData();
    if (data) {
      setUser?.(data);
    } else {
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      setToken?.(null);
    }
    setIsLoading?.(false);
  }, [getData, setIsLoading, setToken, setUser]);

  type UpdateProps = {
    phone_number?: string | undefined;
    email?: string | undefined;
    accept_intercom?: number | undefined;
    avatar?: string | undefined;
    two_fa?: number | undefined;
    lang?: string | undefined;
    name?: string | undefined;
    surname?: string | undefined;
  };

  const handleUpdate = useCallback(
    async (props: UpdateProps) => {
      const newData = await update(props);
      if (newData) {
        setUser?.(newData);
      }
    },
    [setUser, update],
  );

  return {
    user,
    isLoading,
    setUser,
    handleLogOut,
    isAdmin: !!user && ROLES_STAFF.includes(user?.group.id),
    handleRefreshData,
    handleUpdate,
  };
};
