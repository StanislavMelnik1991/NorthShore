import { useTranslation } from "react-i18next";
import {
  getRouteAdmin,
  getRouteAdminEvents,
  getRouteAdminLoyalty,
  getRouteAdminMeeting,
  getRouteAdminNews,
  getRouteAdminNotifications,
  getRouteAdminTechnicalWorks,
  getRouteAdminVoting,
  getRouteMain,
} from "@shared/constants";
import { IconHome, IconBriefcase } from "@shared/icons";
import { NavItemProps } from "../types";

export const useNavBarItems: () => Array<NavItemProps> = () => {
  const { t } = useTranslation("main");
  return [
    {
      title: t("sidebar.main"),
      icon: IconHome,
      href: getRouteMain(),
    },
    {
      title: t("sidebar.admin"),
      icon: IconBriefcase,
      href: getRouteAdmin(),
      breadcrumbs: [
        {
          href: getRouteAdminNews(),
          title: t("sidebar.news"),
        },
        {
          href: getRouteAdminEvents(),
          title: t("sidebar.events"),
        },
        {
          href: getRouteAdminMeeting(),
          title: t("sidebar.meetings"),
        },
        {
          href: getRouteAdminNotifications(),
          title: t("sidebar.notifications"),
        },
        {
          href: getRouteAdminVoting(),
          title: t("sidebar.voting"),
        },
        {
          href: getRouteAdminTechnicalWorks(),
          title: t("sidebar.technicalWorks"),
        },
        {
          href: getRouteAdminLoyalty(),
          title: t("sidebar.loyalty"),
        },
      ],
    },
  ];
};
