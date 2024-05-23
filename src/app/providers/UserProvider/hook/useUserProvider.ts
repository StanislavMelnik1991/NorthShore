import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetMe } from '@features/User/hook/getMe';
import { IUser } from '@entities/types';
import { TOKEN_LOCAL_STORAGE_KEY } from '@shared/constants';

export const useUserProvider = () => {
  const { i18n } = useTranslation();
  const [user, setUser] = useState<IUser>();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY),
  );
  const [isLoading, setIsLoading] = useState(false);

  const { getData } = useGetMe();

  const handleGetData = useCallback(async () => {
    setIsLoading(true);
    const data = await getData();
    if (data) {
      setUser(data);
      if (data.lang) {
        i18n.changeLanguage(data.lang);
      }
    } else {
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      setToken(null);
    }
    setIsLoading(false);
  }, [getData, i18n]);

  const handleSetUser = useCallback((user?: IUser) => {
    setUser(user);
  }, []);

  useEffect(() => {
    if (!user) {
      if (token) {
        setToken(token);
        handleGetData();
      }
    }
  }, [handleGetData, token, user]);

  const value = useMemo(
    () => ({
      user,
      setUser: handleSetUser,
      isLoading,
      setIsLoading,
      token,
      setToken,
    }),
    [handleSetUser, isLoading, token, user],
  );

  return {
    value,
  };
};
