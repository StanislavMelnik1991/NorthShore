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

export const AppRoutes = {
  [AppRoutesEnum.MAIN]: () => "/",
  [AppRoutesEnum.NEWS_CURRENT]: (id: number | string) => `/news/${id}`,
  [AppRoutesEnum.EVENT_CURRENT]: (id: number | string) => `/event/${id}`,
  [AppRoutesEnum.MEETINGS_CURRENT]: (id: number | string) => `/meeting/${id}`,
  [AppRoutesEnum.LOGIN]: () => "/login",
  [AppRoutesEnum.REGISTRATION]: () => "/registration",

  [AppRoutesEnum.ADMIN_NEWS]: () => "/admin/news",
  [AppRoutesEnum.ADMIN_EVENTS]: () => "/admin/events",
  [AppRoutesEnum.ADMIN_MEETINGS]: () => "/admin/meeting",
  [AppRoutesEnum.ADMIN_LOYALTY]: () => "/admin/loyalty",
  [AppRoutesEnum.ADMIN_NOTIFICATIONS]: () => "/admin/notifications",
  [AppRoutesEnum.ADMIN_TECHNICAL_WORKS]: () => "/admin/technical_works",
  [AppRoutesEnum.ADMIN_VOTING]: () => "/admin/voting",

  [AppRoutesEnum.CREATE_EVENT]: () => "/admin/events/create",
  [AppRoutesEnum.CREATE_MEETINGS]: () => "/admin/meeting/create",
  [AppRoutesEnum.CREATE_NEWS]: () => "/admin/news/create",

  [AppRoutesEnum.UPDATE_EVENT]: (id: number | string) => `/admin/events/${id}`,
  [AppRoutesEnum.UPDATE_MEETINGS]: (id: number | string) =>
    `/admin/meeting/${id}`,
  [AppRoutesEnum.UPDATE_NEWS]: (id: number | string) => `/admin/news/${id}`,

  [AppRoutesEnum.FORBIDDEN]: () => "/forbidden",

  [AppRoutesEnum.NOT_FOUND]: () => "*",
};
