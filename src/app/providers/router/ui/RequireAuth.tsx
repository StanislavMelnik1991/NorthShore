import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@features/User/hook";
import { AppRoutes, AppRoutesEnum } from "@shared/constants";

interface RequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const { user } = useUser();
  const auth = !!user;
  if (!auth) {
    return (
      <Navigate
        to={AppRoutes[AppRoutesEnum.FORBIDDEN]()}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
