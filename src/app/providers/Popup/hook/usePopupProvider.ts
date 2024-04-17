import { useCallback, useMemo, useState } from 'react';

export const usePopupProvider = () => {
  const [isShowUserMenu, setIsShowUserMenu] = useState(false);
  const [isShowBurgerMenu, setIsShowBurgerMenu] = useState(false);

  const toggleUserMenu = useCallback(() => {
    setIsShowUserMenu((val) => !val);
  }, []);

  const toggleBurgerMenu = useCallback(() => {
    setIsShowBurgerMenu((val) => !val);
  }, []);
  const closeUserMenu = useCallback(() => {
    setIsShowUserMenu(false);
  }, []);
  const closeBurgerMenu = useCallback(() => {
    setIsShowBurgerMenu(false);
  }, []);

  const value = useMemo(
    () => ({
      isShowUserMenu,
      isShowBurgerMenu,
      toggleUserMenu,
      toggleBurgerMenu,
      closeUserMenu,
      closeBurgerMenu,
    }),
    [
      closeBurgerMenu,
      closeUserMenu,
      isShowBurgerMenu,
      isShowUserMenu,
      toggleBurgerMenu,
      toggleUserMenu,
    ],
  );

  return {
    value,
  };
};
