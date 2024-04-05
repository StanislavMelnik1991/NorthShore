import {
  getRouteAdmin,
  getRouteAdminEvents,
  getRouteAdminLoyalty,
  getRouteAdminMeetings,
  getRouteAdminNews,
  getRouteAdminNotifications,
  getRouteAdminTechnicalWorks,
  getRouteAdminVoting,
  getRouteMain,
} from "@shared/constants";
import { IconHome, IconBriefcase } from "@shared/icons";
import { NavItemProps } from "../types";

export const navBarItems: Array<NavItemProps> = [
  {
    title: "Главная",
    icon: IconHome,
    href: getRouteMain(),
  },
  {
    title: "Администрирование",
    icon: IconBriefcase,
    href: getRouteAdmin(),
    breadcrumbs: [
      {
        href: getRouteAdminNews(),
        title: "Новости",
      },
      {
        href: getRouteAdminEvents(),
        title: "События",
      },
      {
        href: getRouteAdminMeetings(),
        title: "Собрания",
      },
      {
        href: getRouteAdminNotifications(),
        title: "Уведомления",
      },
      {
        href: getRouteAdminVoting(),
        title: "Голосования",
      },
      {
        href: getRouteAdminTechnicalWorks(),
        title: "Технические работы",
      },
      {
        href: getRouteAdminLoyalty(),
        title: "Программы лояльности",
      },
    ],
  },
];
