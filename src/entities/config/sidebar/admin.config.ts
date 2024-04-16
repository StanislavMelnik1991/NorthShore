import { useTranslation } from "react-i18next";
import { AppRoutes, AppRoutesEnum } from "@shared/constants";
import { IconHome, IconBriefcase } from "@shared/icons";
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
      title: t("sidebar.admin"),
      icon: IconBriefcase,
      href: "/admin",
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
  ];
};
