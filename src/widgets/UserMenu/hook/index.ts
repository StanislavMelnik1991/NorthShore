import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { usePopup } from '@features/Popup/hook';

export const useUserMenu = () => {
  const location = useLocation();
  const { closeBurgerMenu, closeUserMenu } = usePopup();

  const handleCloseMenu = useCallback(() => {
    closeBurgerMenu?.();
    closeUserMenu?.();
  }, [closeBurgerMenu, closeUserMenu]);

  return { location, handleCloseMenu };
};
