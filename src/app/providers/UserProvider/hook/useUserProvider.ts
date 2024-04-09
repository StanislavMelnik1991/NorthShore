import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { BaseResponse, IUser, axiosApi } from "@entities/api";
import { TOKEN_LOCAL_STORAGE_KEY } from "@shared/constants";

export const useUserProvider = () => {
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
      if (token) {
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
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, [setUser, user, isLoading]);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );

  return {
    value,
  };
};
