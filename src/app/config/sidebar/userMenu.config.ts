import { useTranslation } from 'react-i18next';
import { useUser } from '@features/User/hook';
import { NavItemProps } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconHuman } from '@shared/icons';

export const useUserMenuConfig: () => Array<NavItemProps> = () => {
  const { t } = useTranslation();
  const { user, handleLogOut } = useUser();
  return [
    {
      title: user ? t('header.logout') : t('header.login'),
      icon: IconHuman,
      href: AppRoutes[AppRoutesEnum.LOGIN](),
      isLink: !user,
      onClick: handleLogOut,
    },
  ];
};
