import { useCallback, useContext } from 'react';
import { TOKEN_LOCAL_STORAGE_KEY } from '@shared/constants';
import { UserContext } from '../context';

export const useUser = () => {
  const { user, isLoading, setUser, setToken, isAdmin } =
    useContext(UserContext);

  const handleLogOut = useCallback(() => {
    setUser?.();
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
    setToken?.(null);
  }, [setToken, setUser]);
  return {
    user,
    isLoading,
    setUser,
    handleLogOut,
    isAdmin,
  };
};
