import { createContext } from "react";
import { IUser } from "../types";

export interface UserContextProps {
  user?: IUser;
  setUser?: (user: IUser) => void;
  isLoading?: boolean;
  setIsLoading?: (val: boolean) => void;
}

export const UserContext = createContext<UserContextProps>({});
