import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { usePopup } from '@features/Popup/hook';

export const useMainLayout = () => {
  const userMenuRef = useRef<HTMLDivElement>(null);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { isShowBurgerMenu, isShowUserMenu, closeBurgerMenu, closeUserMenu } =
    usePopup();

  const isWebView =
    new URLSearchParams(location.search).get('mobile_view') === 'true';

  const handleClickOutsideUserMenu = useCallback(
    (event: MouseEvent) => {
      if (
        userMenuRef &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        closeUserMenu?.();
      }
    },
    [closeUserMenu],
  );
  const handleClickOutsideBurgerMenu = useCallback(
    (event: MouseEvent) => {
      if (
        burgerMenuRef &&
        burgerMenuRef.current &&
        !burgerMenuRef.current.contains(event.target as Node)
      ) {
        closeBurgerMenu?.();
      }
    },
    [closeBurgerMenu],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideUserMenu, true);
    document.addEventListener('click', handleClickOutsideBurgerMenu, true);
    return () => {
      document.removeEventListener('click', handleClickOutsideUserMenu, true);
      document.removeEventListener('click', handleClickOutsideBurgerMenu, true);
    };
  }, [handleClickOutsideUserMenu, handleClickOutsideBurgerMenu]);

  return {
    isWebView,
    isShowUserMenu,
    isShowBurgerMenu,
    burgerMenuRef,
    userMenuRef,
  };
};
