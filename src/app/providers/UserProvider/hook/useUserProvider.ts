import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { axiosApi } from "@entities/api";
import { BaseResponse, IUser } from "@entities/types";
import { TOKEN_LOCAL_STORAGE_KEY } from "@shared/constants";

export const useUserProvider = () => {
  const [user, setUser] = useState<IUser>();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY),
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      if (token) {
        setToken(token);
        setIsLoading(true);
        axiosApi
          .get<BaseResponse<IUser>>("/user")
          .then(({ data: { data } }) => {
            setUser?.(data);
          })
          .catch((err) => {
            console.error(err);
            toast.error("Не удалось получить данные юзера");
            localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
            setToken(null);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, [setUser, user, isLoading, token]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      setIsLoading,
      token,
      setToken,
    }),
    [isLoading, token, user],
  );

  return {
    value,
  };
};
