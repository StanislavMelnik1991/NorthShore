export enum AppRoutes {
  MAIN = "main",
  SETTINGS = "settings",
  ABOUT = "about",
  PROFILE = "profile",
  FORBIDDEN = "forbidden",
  NOT_FOUND = "not_found",
  ADMIN_NEWS = "admin_news",
  ADMIN_EVENTS = "admin_events",
  ADMIN_MEETINGS = "admin_meetings",
  ADMIN_NOTIFICATIONS = "admin_notifications",
  ADMIN_VOTING = "admin_voting",
  ADMIN_LOYALTY = "admin_loyalty",
}

export const getRouteMain = () => "/";
export const getRouteSettings = () => "/settings";
export const getRouteAbout = () => "/about";
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteForbidden = () => "/forbidden";

export const getRouteAdminNews = () => "/admin/news";
export const getRouteAdminEvents = () => "/admin/events";
export const getRouteAdminMeetings = () => "/admin/meetings";
export const getRouteAdminNotifications = () => "/admin/notifications";
export const getRouteAdminVoting = () => "/admin/voting";
export const getRouteAdminLoyalty = () => "/admin/loyalty";

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteSettings()]: AppRoutes.SETTINGS,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteProfile(":id")]: AppRoutes.PROFILE,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
  [getRouteAdminNews()]: AppRoutes.ADMIN_NEWS,
  [getRouteAdminEvents()]: AppRoutes.ADMIN_EVENTS,
  [getRouteAdminMeetings()]: AppRoutes.ADMIN_MEETINGS,
  [getRouteAdminNotifications()]: AppRoutes.ADMIN_NOTIFICATIONS,
  [getRouteAdminVoting()]: AppRoutes.ADMIN_VOTING,
  [getRouteAdminLoyalty()]: AppRoutes.ADMIN_LOYALTY,
};
