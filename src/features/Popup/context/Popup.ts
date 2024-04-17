import { createContext } from "react";

export interface PopupProps {
  isShowUserMenu?: boolean;
  toggleUserMenu?: () => void;
  isShowBurgerMenu?: boolean;
  toggleBurgerMenu?: () => void;
}

export const PopupContext = createContext<PopupProps>({});
