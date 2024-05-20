import { useTranslation } from 'react-i18next';
import { useUser } from '@features/User/hook';
import { NavItemProps } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconLogout, IconSettings } from '@shared/icons';

export const useUserMenuConfig: () => Array<NavItemProps> = () => {
  const { t } = useTranslation();
  const { user, handleLogOut } = useUser();
  return user
    ? [
        {
          title: t('sidebar.settings'),
          icon: IconSettings,
          href: AppRoutes[AppRoutesEnum.SETTINGS](),
          isLink: !!user,
        },
        {
          title: user ? t('header.logout') : t('header.login'),
          icon: IconLogout,
          href: AppRoutes[AppRoutesEnum.AUTH_LOGIN](),
          isLink: !user,
          onClick: handleLogOut,
        },
      ]
    : [
        {
          title: user ? t('header.logout') : t('header.login'),
          icon: IconLogout,
          href: AppRoutes[AppRoutesEnum.AUTH_LOGIN](),
          isLink: !user,
          onClick: handleLogOut,
        },
      ];
};
