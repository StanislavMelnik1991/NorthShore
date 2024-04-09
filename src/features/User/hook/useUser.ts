import { useContext } from "react";
import { UserContext } from "../context";

export const useUser = () => {
  const { user, isLoading, setUser } = useContext(UserContext);
  return {
    user,
    isLoading,
    setUser,
  };
};
