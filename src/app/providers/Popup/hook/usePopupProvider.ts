import { useCallback, useMemo, useState } from "react";

export const usePopupProvider = () => {
  const [isShowUserMenu, setIsShowUserMenu] = useState(false);
  const [isShowBurgerMenu, setIsShowBurgerMenu] = useState(false);

  const toggleUserMenu = useCallback(() => {
    setIsShowUserMenu((val) => !val);
  }, []);

  const toggleBurgerMenu = useCallback(() => {
    setIsShowBurgerMenu((val) => !val);
  }, []);

  const value = useMemo(
    () => ({
      isShowUserMenu,
      isShowBurgerMenu,
      toggleUserMenu,
      toggleBurgerMenu,
    }),
    [isShowBurgerMenu, isShowUserMenu, toggleBurgerMenu, toggleUserMenu],
  );

  return {
    value,
  };
};
