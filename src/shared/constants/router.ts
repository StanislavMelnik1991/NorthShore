export enum AppRoutes {
  MAIN = "main",
  SETTINGS = "settings",
  ABOUT = "about",
  PROFILE = "profile",
  FORBIDDEN = "forbidden",
  ADMIN_EVENTS = "admin_events",
  ADMIN_MEETINGS = "admin_meetings",
  ADMIN_NOTIFICATIONS = "admin_notifications",
  ADMIN_TECHNICAL_WORKS = "admin_technical_works",
  ADMIN_VOTING = "admin_voting",
  ADMIN_LOYALTY = "admin_loyalty",
  // Auth
  LOGIN = "login",
  REGISTRATION = "registration",
  // Admin news
  ADMIN_NEWS = "admin_news",
  CREATE_NEWS = "create_news",
  // not found
  NOT_FOUND = "not_found",
}

export const getRouteLogin = () => "/login";
export const getRouteRegistration = () => "/registration";

// Ready
export const getRouteAdminNews = () => "/admin/news";
export const getRouteCreateNews = () => "/admin/news/create";

export const getRouteMain = () => "/";
export const getRouteSettings = () => "/settings";
export const getRouteAbout = () => "/about";
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteForbidden = () => "/forbidden";

export const getRouteAdmin = () => "/admin";

export const getRouteAdminEvents = () => "/admin/events";
export const getRouteAdminMeetings = () => "/admin/meetings";
export const getRouteAdminNotifications = () => "/admin/notifications";
export const getRouteAdminTechnicalWorks = () => "/admin/technical_works";
export const getRouteAdminVoting = () => "/admin/voting";
export const getRouteAdminLoyalty = () => "/admin/loyalty";
