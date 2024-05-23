import { ForbiddenPage } from '@pages/Forbidden';
import { useUser } from '@features/User/hook';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: Array<number>;
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const { user } = useUser();
  const auth = !!user;
  if (
    !auth ||
    (roles &&
      !roles?.some((val) =>
        user.role?.access_codes.map((el) => el.id).includes(val),
      ))
  ) {
    return <ForbiddenPage />;
  }

  return children;
}
