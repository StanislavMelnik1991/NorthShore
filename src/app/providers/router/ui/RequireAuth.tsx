import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@features/User/hook';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: Array<number>;
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const location = useLocation();
  const { user } = useUser();
  const auth = !!user;
  if (!auth || (roles && !roles?.includes(user.group.id))) {
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
