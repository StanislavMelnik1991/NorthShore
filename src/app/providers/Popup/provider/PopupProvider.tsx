import { ReactNode } from 'react';
import { PopupContext } from '@features/Popup';
import { usePopupProvider } from '../hook';

interface Props {
  children: ReactNode;
}

export const PopupProvider = ({ children }: Props) => {
  const { value } = usePopupProvider();
  return (
    <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
  );
};
