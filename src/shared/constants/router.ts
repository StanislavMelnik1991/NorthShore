export enum AppRoutes {
  MAIN = "main",
  SETTINGS = "settings",
  ABOUT = "about",
  PROFILE = "profile",
  FORBIDDEN = "forbidden",
  ADMIN_MEETINGS = "admin_meetings",
  ADMIN_NOTIFICATIONS = "admin_notifications",
  ADMIN_TECHNICAL_WORKS = "admin_technical_works",
  ADMIN_VOTING = "admin_voting",
  ADMIN_LOYALTY = "admin_loyalty",
  // News
  NEWS_CURRENT = "news_current",
  // Auth
  LOGIN = "login",
  REGISTRATION = "registration",
  // Admin news
  ADMIN_NEWS = "admin_news",
  UPDATE_NEWS = "update_news",
  CREATE_NEWS = "create_news",
  // Admin events
  ADMIN_EVENTS = "admin_events",
  UPDATE_EVENT = "update_event",
  CREATE_EVENT = "create_event",

  // not found
  NOT_FOUND = "not_found",
}

export const getCurrentNews = (id: number | string) => `/news/${id}`;
export const getCurrentEvent = (id: number | string) => `/event/${id}`;

export const getRouteLogin = () => "/login";
export const getRouteRegistration = () => "/registration";

export const getRouteAdminNews = () => "/admin/news";
export const getRouteCreateNews = () => "/admin/news/create";
export const getRouteUpdateNews = (id: number | string) => `/admin/news/${id}`;

export const getRouteAdminEvents = () => "/admin/events";
export const getRouteCreateEvent = () => "/admin/events/create";
export const getRouteUpdateEvent = (id: number | string) =>
  `/admin/events/${id}`;

export const getRouteMain = () => "/";
export const getRouteSettings = () => "/settings";
export const getRouteAbout = () => "/about";
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteForbidden = () => "/forbidden";

export const getRouteAdmin = () => "/admin";

export const getRouteAdminMeetings = () => "/admin/meetings";
export const getRouteAdminNotifications = () => "/admin/notifications";
export const getRouteAdminTechnicalWorks = () => "/admin/technical_works";
export const getRouteAdminVoting = () => "/admin/voting";
export const getRouteAdminLoyalty = () => "/admin/loyalty";
