import { Navigate, useLocation } from "react-router-dom";
import { getRouteMain } from "@shared/constants";

interface RequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();

  // ToDo fix auth
  const auth = true;
  if (!auth) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  return children;
}
