import { createContext } from 'react';
import { IUser } from '@entities/types';

export interface UserContextProps {
  user?: IUser;
  isAdmin?: boolean;
  setUser?: (user?: IUser) => void;
  isLoading?: boolean;
  setIsLoading?: (val: boolean) => void;
  token?: string | null;
  setToken?: (val: string | null) => void;
}

export const UserContext = createContext<UserContextProps>({});
