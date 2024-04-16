import { useTranslation } from "react-i18next";
import { AppRoutes, AppRoutesEnum } from "@shared/constants";
import { IconHome, IconNewspaper, IconMask, IconLoudspeaker, IconWrench, IconDocumentHolder, IconCalendarX, IconQuestion, IconGear } from "@shared/icons";
import { NavItemProps } from "./types";

export const useUserSidebarConfig: () => Array<NavItemProps> = () => {
  const { t } = useTranslation();
  return [
    {
      title: t("sidebar.main"),
      icon: IconHome,
      href: AppRoutes[AppRoutesEnum.MAIN](),
    },
    {
      title: t("sidebar.news"),
      icon: IconNewspaper,
      href: AppRoutes[AppRoutesEnum.NEWS](),
    },
    {
      title: t("sidebar.poster"),
      icon: IconMask,
      href: AppRoutes[AppRoutesEnum.POSTER](),
    },
    {
      title: t("sidebar.activity"),
      icon: IconLoudspeaker,
      href: AppRoutes[AppRoutesEnum.ACTIVITY](),
    },
    {
      title: t("sidebar.services"),
      icon: IconWrench,
      href: AppRoutes[AppRoutesEnum.SERVICES](),
    },
    {
      title: t("sidebar.requests"),
      icon: IconDocumentHolder,
      href: AppRoutes[AppRoutesEnum.REQUESTS](),
    },
    {
      title: t("sidebar.shutdowns"),
      icon: IconCalendarX,
      href: AppRoutes[AppRoutesEnum.SHUTDOWNS](),
    },
    {
      title: t("sidebar.knowledge"),
      icon: IconQuestion,
      href: AppRoutes[AppRoutesEnum.KNOWLEDGE](),
    },
    {
      title: t("sidebar.settings"),
      icon: IconGear,
      href: AppRoutes[AppRoutesEnum.SETTINGS](),
    },
  ];
};
