import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { usePopup } from '@features/Popup/hook';
import { useUser } from '@features/User';

export const useSideBar = () => {
  const location = useLocation();
  const { user } = useUser();
  const { closeBurgerMenu, closeUserMenu } = usePopup();

  const handleCloseMenu = useCallback(() => {
    closeBurgerMenu?.();
    closeUserMenu?.();
  }, [closeBurgerMenu, closeUserMenu]);

  return { location, handleCloseMenu, user };
};
