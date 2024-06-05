import { useContext } from 'react';
import { PopupContext } from '../context';

export const usePopup = () => {
  const {
    isShowBurgerMenu,
    isShowUserMenu,
    toggleBurgerMenu,
    toggleUserMenu,
    closeBurgerMenu,
    closeUserMenu,
    btnRef,
  } = useContext(PopupContext);
  return {
    isShowBurgerMenu,
    isShowUserMenu,
    toggleBurgerMenu,
    toggleUserMenu,
    closeBurgerMenu,
    closeUserMenu,
    btnRef,
  };
};
