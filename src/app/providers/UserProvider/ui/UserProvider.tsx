import { ReactNode, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IUser, UserContext } from "@features/User";
import { BaseResponse, axiosApi } from "@entities/api";
import { TOKEN_LOCAL_STORAGE_KEY } from "@shared/constants";

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
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

  const defaultProps = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );
  return (
    <UserContext.Provider value={defaultProps}>{children}</UserContext.Provider>
  );
};
