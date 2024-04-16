export enum AppRoutes {
  MAIN,
  SETTINGS,
  ABOUT,
  PROFILE,
  FORBIDDEN,
  ADMIN_NOTIFICATIONS,
  ADMIN_TECHNICAL_WORKS,
  ADMIN_VOTING,
  ADMIN_LOYALTY,
  // User pages
  NEWS_CURRENT,
  EVENT_CURRENT,
  MEETINGS_CURRENT,
  // Auth
  LOGIN,
  REGISTRATION,
  // Admin news
  ADMIN_NEWS,
  UPDATE_NEWS,
  CREATE_NEWS,
  // Admin events
  ADMIN_EVENTS,
  UPDATE_EVENT,
  CREATE_EVENT,
  // Admin meetings
  ADMIN_MEETINGS,
  UPDATE_MEETINGS,
  CREATE_MEETINGS,
  // not found
  NOT_FOUND,
}

export const getRouteCurrentNews = (id: number | string) => `/news/${id}`;
export const getRouteCurrentEvent = (id: number | string) => `/event/${id}`;
export const getRouteCurrentMeeting = (id: number | string) => `/meeting/${id}`;

export const getRouteLogin = () => "/login";
export const getRouteRegistration = () => "/registration";

export const getRouteAdminNews = () => "/admin/news";
export const getRouteCreateNews = () => "/admin/news/create";
export const getRouteUpdateNews = (id: number | string) => `/admin/news/${id}`;

export const getRouteAdminEvents = () => "/admin/events";
export const getRouteCreateEvent = () => "/admin/events/create";
export const getRouteUpdateEvent = (id: number | string) =>
  `/admin/events/${id}`;

export const getRouteAdminMeeting = () => "/admin/meeting";
export const getRouteCreateMeeting = () => "/admin/meeting/create";
export const getRouteUpdateMeeting = (id: number | string) =>
  `/admin/meeting/${id}`;

export const getRouteMain = () => "/";
export const getRouteSettings = () => "/settings";
export const getRouteAbout = () => "/about";
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteForbidden = () => "/forbidden";

export const getRouteAdmin = () => "/admin";

export const getRouteAdminNotifications = () => "/admin/notifications";
export const getRouteAdminTechnicalWorks = () => "/admin/technical_works";
export const getRouteAdminVoting = () => "/admin/voting";
export const getRouteAdminLoyalty = () => "/admin/loyalty";
