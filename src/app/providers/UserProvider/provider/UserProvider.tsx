import { ReactNode } from 'react';
import { UserContext } from '@features/User';
import { useUserProvider } from '../hook';

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const { value } = useUserProvider();
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
