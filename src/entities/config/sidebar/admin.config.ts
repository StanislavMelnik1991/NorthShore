import { useTranslation } from "react-i18next";
import { AppRoutes, AppRoutesEnum } from "@shared/constants";
import {
  IconHome,
  IconBriefcase,
  IconTable,
  IconDiagram,
  IconLock,
  IconWrench,
  IconDocumentHolder,
  IconLoudspeaker,
  IconPassport,
  IconPeople,
  IconGear,
} from "@shared/icons";
import { NavItemProps } from "./types";

export const useAdminSidebarConfig: () => Array<NavItemProps> = () => {
  const { t } = useTranslation();
  return [
    {
      title: t("sidebar.main"),
      icon: IconHome,
      href: AppRoutes[AppRoutesEnum.ADMIN](),
    },
    {
      title: t("sidebar.accounting"),
      icon: IconTable,
      href: AppRoutes[AppRoutesEnum.ACCOUNTING](),
    },
    {
      title: t("sidebar.statistic"),
      icon: IconDiagram,
      href: AppRoutes[AppRoutesEnum.STATISTIC](),
    },
    {
      title: t("sidebar.security"),
      icon: IconLock,
      href: AppRoutes[AppRoutesEnum.SECURITY](),
    },
    {
      title: t("sidebar.engineering"),
      icon: IconWrench,
      href: AppRoutes[AppRoutesEnum.ENGINEERING](),
    },
    {
      title: t("sidebar.invocation"),
      icon: IconDocumentHolder,
      href: AppRoutes[AppRoutesEnum.INVOCATION](),
    },
    {
      title: t("sidebar.admin"),
      icon: IconBriefcase,
      href: AppRoutes[AppRoutesEnum.ADMIN](),
      breadcrumbs: [
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_NEWS](),
          title: t("sidebar.news"),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_EVENTS](),
          title: t("sidebar.events"),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_MEETINGS](),
          title: t("sidebar.meetings"),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_NOTIFICATIONS](),
          title: t("sidebar.notifications"),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_VOTING](),
          title: t("sidebar.voting"),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_TECHNICAL_WORKS](),
          title: t("sidebar.technicalWorks"),
        },
        {
          href: AppRoutes[AppRoutesEnum.ADMIN_LOYALTY](),
          title: t("sidebar.loyalty"),
        },
      ],
    },
    {
      title: t("sidebar.inform"),
      icon: IconLoudspeaker,
      href: AppRoutes[AppRoutesEnum.INFORM](),
    },
    {
      title: t("sidebar.passport"),
      icon: IconPassport,
      href: AppRoutes[AppRoutesEnum.PASSPORT](),
    },
    {
      title: t("sidebar.users"),
      icon: IconPeople,
      href: AppRoutes[AppRoutesEnum.USERS](),
    },
    {
      title: t("sidebar.settings"),
      icon: IconGear,
      href: AppRoutes[AppRoutesEnum.ADMIN_SETTINGS](),
    },
  ];
};
