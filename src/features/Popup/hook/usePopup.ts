import { useContext, useRef } from 'react';
import { PopupContext } from '../context';

export const usePopup = () => {
  const iconBurgerRef = useRef<SVGSVGElement>(null);
  const {
    isShowBurgerMenu,
    isShowUserMenu,
    toggleBurgerMenu,
    toggleUserMenu,
    closeBurgerMenu,
    closeUserMenu,
  } = useContext(PopupContext);
  return {
    isShowBurgerMenu,
    isShowUserMenu,
    toggleBurgerMenu,
    toggleUserMenu,
    closeBurgerMenu,
    closeUserMenu,
    iconBurgerRef,
  };
};
