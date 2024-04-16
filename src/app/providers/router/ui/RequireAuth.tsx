import { Navigate, useLocation } from "react-router-dom";
import { AppRoutes, AppRoutesEnum } from "@shared/constants";

interface RequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();

  // ToDo fix auth
  const auth = true;
  if (!auth) {
    return (
      <Navigate
        to={AppRoutes[AppRoutesEnum.MAIN]()}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
