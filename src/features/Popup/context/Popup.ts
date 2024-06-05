import { RefObject, createContext } from 'react';

export interface PopupProps {
  isShowUserMenu?: boolean;
  toggleUserMenu?: () => void;
  closeUserMenu?: () => void;
  isShowBurgerMenu?: boolean;
  toggleBurgerMenu?: () => void;
  closeBurgerMenu?: () => void;
  btnRef?: RefObject<HTMLDivElement>;
}

export const PopupContext = createContext<PopupProps>({});
