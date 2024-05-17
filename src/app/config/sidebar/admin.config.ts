import { useTranslation } from 'react-i18next';
import { NavItemProps } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import {
  IconHome,
  IconBriefcase,
  IconTable,
  IconDiagram,
  IconLock,
  IconWrench,
  IconDocumentHolder,
  IconPassport,
  IconPeople,
  IconGear,
} from '@shared/icons';

export const useAdminSidebarConfig: () => Array<NavItemProps> = () => {
  const { t } = useTranslation();
  return [
    {
      title: t('sidebar.main'),
      icon: IconHome,
      href: AppRoutes[AppRoutesEnum.ADMIN](),
      isLink: true,
    },
    {
      title: t('sidebar.accounting'),
      icon: IconTable,
      href: AppRoutes[AppRoutesEnum.ACCOUNTING](),
      isLink: true,
    },
    {
      title: t('sidebar.statistic'),
      icon: IconDiagram,
      href: AppRoutes[AppRoutesEnum.STATISTIC](),
      isLink: true,
    },
    {
      title: t('sidebar.security'),
      icon: IconLock,
      href: AppRoutes[AppRoutesEnum.SECURITY](),
      isLink: true,
      breadcrumbs: [
        {
          href: AppRoutes[AppRoutesEnum.SECURITY](),
        },
        {
          href: AppRoutes[AppRoutesEnum.SECURITY_ACCESS](),
        },
        {
          href: AppRoutes[AppRoutesEnum.SECURITY_INTERCOM](),
        },
        {
          href: AppRoutes[AppRoutesEnum.SECURITY_VIDEO](),
        },
      ],
    },
    {
      title: t('sidebar.engineering'),
      icon: IconWrench,
      href: AppRoutes[AppRoutesEnum.ENGINEERING](),
      breadcrumbs: [
        {
          href: AppRoutes[AppRoutesEnum.ENGINEERING_ENERGY](),
          title: t('sidebar.energy'),
        },
        {
          href: AppRoutes[AppRoutesEnum.ENGINEERING_HEATING](),
          title: t('sidebar.heating'),
        },
        {
          href: AppRoutes[AppRoutesEnum.ENGINEERING_LIFTS](),
          title: t('sidebar.lifts'),
        },
      ],
    },
    {
      title: t('sidebar.invocation'),
      icon: IconDocumentHolder,
      breadcrumbs: [
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_REQUESTS](),
          title: t('sidebar.requests'),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_APPLICATIONS](),
          title: t('sidebar.applications'),
        },
        {
          href: AppRoutes[AppRoutesEnum.REQUESTS_CREATE](),
        },
        {
          href: AppRoutes[AppRoutesEnum.APPLICATIONS_CREATE](),
        },
      ],
    },
    {
      title: t('sidebar.admin'),
      icon: IconBriefcase,
      href: AppRoutes[AppRoutesEnum.ADMIN](),
      isLink: false,
      breadcrumbs: [
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_NEWS](),
          title: t('sidebar.news'),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_EVENTS](),
          title: t('sidebar.events'),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_MEETINGS](),
          title: t('sidebar.meetings'),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_NOTIFICATIONS](),
          title: t('sidebar.notifications'),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_VOTING](),
          title: t('sidebar.voting'),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_TECHNICAL_WORKS](),
          title: t('sidebar.technicalWorks'),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_LOYALTY](),
          title: t('sidebar.loyalty'),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_SERVICES](),
          title: t('sidebar.services'),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_ADVERTISEMENT](),
          title: t('sidebar.advertisement'),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_EMPLOYEE_ANNOUNCEMENTS](),
          title: t('sidebar.employee_announcements'),
        },
      ],
    },
    {
      title: t('sidebar.passport'),
      icon: IconPassport,
      href: AppRoutes[AppRoutesEnum.PASSPORT](),
      isLink: true,
    },
    {
      title: t('sidebar.users'),
      icon: IconPeople,
      href: AppRoutes[AppRoutesEnum.USERS](),
      isLink: true,
    },
    {
      title: t('sidebar.accessRights'),
      icon: IconGear,
      isLink: true,
      breadcrumbs: [
        {
          title: t('sidebar.roles'),
          href: AppRoutes[AppRoutesEnum.ADMIN_ROLES](),
        },
      ],
    },
  ];
};
