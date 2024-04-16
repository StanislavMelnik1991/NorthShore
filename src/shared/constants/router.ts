export enum AppRoutesEnum {
  MAIN,
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

const getRouteCurrentNews = (id: number | string) => `/news/${id}`;
const getRouteCurrentEvent = (id: number | string) => `/event/${id}`;
const getRouteCurrentMeeting = (id: number | string) => `/meeting/${id}`;

const getRouteLogin = () => "/login";
const getRouteRegistration = () => "/registration";

const getRouteAdminNews = () => "/admin/news";
const getRouteCreateNews = () => "/admin/news/create";
const getRouteUpdateNews = (id: number | string) => `/admin/news/${id}`;

const getRouteAdminEvents = () => "/admin/events";
const getRouteCreateEvent = () => "/admin/events/create";
const getRouteUpdateEvent = (id: number | string) => `/admin/events/${id}`;

const getRouteAdminMeeting = () => "/admin/meeting";
const getRouteCreateMeeting = () => "/admin/meeting/create";
const getRouteUpdateMeeting = (id: number | string) => `/admin/meeting/${id}`;

const getRouteMain = () => "/";
const getRouteForbidden = () => "/forbidden";

const getRouteAdminNotifications = () => "/admin/notifications";
const getRouteAdminTechnicalWorks = () => "/admin/technical_works";
const getRouteAdminVoting = () => "/admin/voting";
const getRouteAdminLoyalty = () => "/admin/loyalty";

type GetRoute = ((id: number | string) => string) | (() => string);

export const AppRoutes: Record<AppRoutesEnum, GetRoute> = {
  [AppRoutesEnum.MAIN]: getRouteMain,
  [AppRoutesEnum.NEWS_CURRENT]: getRouteCurrentNews,
  [AppRoutesEnum.EVENT_CURRENT]: getRouteCurrentEvent,
  [AppRoutesEnum.MEETINGS_CURRENT]: getRouteCurrentMeeting,
  [AppRoutesEnum.LOGIN]: getRouteLogin,
  [AppRoutesEnum.REGISTRATION]: getRouteRegistration,

  [AppRoutesEnum.ADMIN_NEWS]: getRouteAdminNews,
  [AppRoutesEnum.ADMIN_EVENTS]: getRouteAdminEvents,
  [AppRoutesEnum.ADMIN_MEETINGS]: getRouteAdminMeeting,
  [AppRoutesEnum.ADMIN_LOYALTY]: getRouteAdminLoyalty,
  [AppRoutesEnum.ADMIN_NOTIFICATIONS]: getRouteAdminNotifications,
  [AppRoutesEnum.ADMIN_TECHNICAL_WORKS]: getRouteAdminTechnicalWorks,
  [AppRoutesEnum.ADMIN_VOTING]: getRouteAdminVoting,

  [AppRoutesEnum.CREATE_EVENT]: getRouteCreateEvent,
  [AppRoutesEnum.CREATE_MEETINGS]: getRouteCreateMeeting,
  [AppRoutesEnum.CREATE_NEWS]: getRouteCreateNews,
  [AppRoutesEnum.UPDATE_EVENT]: getRouteUpdateEvent,
  [AppRoutesEnum.UPDATE_MEETINGS]: getRouteUpdateMeeting,
  [AppRoutesEnum.UPDATE_NEWS]: getRouteUpdateNews,

  [AppRoutesEnum.FORBIDDEN]: getRouteForbidden,

  [AppRoutesEnum.NOT_FOUND]: () => "*",
};
