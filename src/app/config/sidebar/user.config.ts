import { useTranslation } from 'react-i18next';
import { NavItemProps } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import {
  IconHome,
  IconNewspaper,
  IconMask,
  IconLoudspeaker,
  IconWrench,
  IconDocumentHolder,
  IconCalendarX,
  IconQuestion,
  IconGear,
} from '@shared/icons';

export const useUserSidebarConfig: () => Array<NavItemProps> = () => {
  const { t } = useTranslation();
  return [
    {
      title: t('sidebar.main'),
      icon: IconHome,
      href: AppRoutes[AppRoutesEnum.MAIN](),
      isLink: true,
    },
    {
      title: t('sidebar.news'),
      icon: IconNewspaper,
      href: AppRoutes[AppRoutesEnum.NEWS](),
      isLink: true,
    },
    {
      title: t('sidebar.poster'),
      icon: IconMask,
      href: AppRoutes[AppRoutesEnum.POSTER](),
      isLink: true,
    },
    {
      title: t('sidebar.activity'),
      icon: IconLoudspeaker,
      href: AppRoutes[AppRoutesEnum.ACTIVITY](),
      isLink: true,
    },
    {
      title: t('sidebar.services'),
      icon: IconWrench,
      href: AppRoutes[AppRoutesEnum.SERVICES](),
      isLink: true,
    },
    {
      title: t('sidebar.requests'),
      icon: IconDocumentHolder,
      href: AppRoutes[AppRoutesEnum.REQUESTS](),
      isLink: true,
    },
    {
      title: t('sidebar.shutdowns'),
      icon: IconCalendarX,
      href: AppRoutes[AppRoutesEnum.SHUTDOWNS](),
      isLink: true,
    },
    {
      title: t('sidebar.knowledge'),
      icon: IconQuestion,
      href: AppRoutes[AppRoutesEnum.KNOWLEDGE](),
      isLink: true,
    },
    {
      title: t('sidebar.settings'),
      icon: IconGear,
      href: AppRoutes[AppRoutesEnum.SETTINGS](),
      isLink: true,
    },
  ];
};
