import { useCallback, useState } from 'react';
import { Breadcrumb } from '../../Breadcrumb';
import { NavItemProps } from '../../types';

interface Props extends Pick<NavItemProps, 'href' | 'breadcrumbs'> {
  pathname: string;
}

export const useNavItem = ({ breadcrumbs, href, pathname }: Props) => {
  const breadcrumbsPathArr = breadcrumbs?.map(({ href }) => href);
  const isActive = breadcrumbsPathArr?.length
    ? breadcrumbsPathArr.includes(pathname)
    : pathname === href;
  const [isExpanded, setIsExpanded] = useState(!isActive);

  const breadcrumbElementArr = breadcrumbs
    ?.map((el, index) => {
      if (!el.title) {
        return;
      }
      return (
        <Breadcrumb
          href={el.href}
          title={el.title}
          pathname={pathname}
          key={`navigation-breadcrumbs-${index}`}
        />
      );
    })
    .filter((val) => !!val);

  const handleToggleBreadcrumbs = useCallback(() => {
    setIsExpanded((val) => {
      return !val;
    });
  }, []);

  return {
    isExpanded,
    handleToggleBreadcrumbs,
    breadcrumbElementArr,
    isActive,
  };
};
