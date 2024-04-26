export enum AppRoutesEnum {
  // User pages
  NEWS_CURRENT,
  EVENT_CURRENT,
  MEETINGS_CURRENT,
  MAIN,
  FORBIDDEN,
  NEWS,
  POSTER,
  ACTIVITY,
  SERVICES,

  REQUESTS,
  REQUESTS_CURRENT,
  REQUESTS_CREATE,
  APPLICATIONS,
  APPLICATIONS_CREATE,

  SHUTDOWNS,
  KNOWLEDGE,
  SETTINGS,

  ADMIN,

  ACCOUNTING,
  STATISTIC,

  SECURITY,
  SECURITY_ACCESS,
  SECURITY_ACCESS_CREATE,
  SECURITY_ACCESS_UPDATE,
  SECURITY_ACCESS_CURRENT,
  SECURITY_INTERCOM,

  SECURITY_VIDEO,
  SECURITY_VIDEO_CREATE,
  SECURITY_VIDEO_UPDATE,
  SECURITY_VIDEO_CURRENT,

  ENGINEERING,
  INFORM,
  PASSPORT,
  USERS,
  ADMIN_SETTINGS,

  ADMIN_REQUESTS,
  ADMIN_REQUESTS_CURRENT,
  ADMIN_APPLICATIONS,

  ADMIN_NOTIFICATIONS,
  ADMIN_TECHNICAL_WORKS,
  ADMIN_VOTING,
  ADMIN_LOYALTY,
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
  [AppRoutesEnum.MAIN]: () => '/',
  [AppRoutesEnum.ADMIN]: () => '/admin',
  [AppRoutesEnum.EVENT_CURRENT]: (id: number | string) => `/event/${id}`,
  [AppRoutesEnum.MEETINGS_CURRENT]: (id: number | string) => `/meeting/${id}`,
  [AppRoutesEnum.LOGIN]: () => '/login',
  [AppRoutesEnum.REGISTRATION]: () => '/registration',
  [AppRoutesEnum.NEWS]: () => '/news',
  [AppRoutesEnum.NEWS_CURRENT]: (id: number | string) => `/news/${id}`,
  [AppRoutesEnum.POSTER]: () => '/poster',
  [AppRoutesEnum.ACTIVITY]: () => '/activity',
  [AppRoutesEnum.SERVICES]: () => '/services',

  [AppRoutesEnum.REQUESTS]: () => '/requests',
  [AppRoutesEnum.REQUESTS_CREATE]: () => '/requests/create',
  [AppRoutesEnum.REQUESTS_CURRENT]: (id: number | string) => `/requests/${id}`,
  [AppRoutesEnum.APPLICATIONS]: () => '/applications',
  [AppRoutesEnum.APPLICATIONS_CREATE]: () => '/applications/create',

  [AppRoutesEnum.SHUTDOWNS]: () => '/shutdowns',
  [AppRoutesEnum.KNOWLEDGE]: () => '/knowledge',
  [AppRoutesEnum.SETTINGS]: () => '/settings',

  [AppRoutesEnum.ADMIN_SETTINGS]: () => '/admin/settings',
  [AppRoutesEnum.USERS]: () => '/admin/users',
  [AppRoutesEnum.PASSPORT]: () => '/admin/passport',
  [AppRoutesEnum.INFORM]: () => '/admin/inform',

  [AppRoutesEnum.ADMIN_REQUESTS]: () => '/admin/requests',
  [AppRoutesEnum.ADMIN_REQUESTS_CURRENT]: (id: number | string) =>
    `/admin/requests/${id}`,
  [AppRoutesEnum.ADMIN_APPLICATIONS]: () => '/admin/applications',

  [AppRoutesEnum.ENGINEERING]: () => '/admin/engineering',

  [AppRoutesEnum.SECURITY]: () => '/admin/security',
  [AppRoutesEnum.SECURITY_ACCESS]: () => '/admin/security/access',
  [AppRoutesEnum.SECURITY_ACCESS_CREATE]: () => '/admin/security/access/create',
  [AppRoutesEnum.SECURITY_ACCESS_CURRENT]: (id: number | string) =>
    `/admin/security/access/${id}`,
  [AppRoutesEnum.SECURITY_ACCESS_UPDATE]: (id: number | string) =>
    `/admin/security/access/${id}/update`,
  [AppRoutesEnum.SECURITY_INTERCOM]: () => '/admin/security/intercom',
  [AppRoutesEnum.SECURITY_VIDEO]: () => '/admin/security/video',
  [AppRoutesEnum.SECURITY_VIDEO_CREATE]: () => '/admin/security/video/create',
  [AppRoutesEnum.SECURITY_VIDEO_CURRENT]: (id: number | string) =>
    `/admin/security/video/${id}`,
  [AppRoutesEnum.SECURITY_VIDEO_UPDATE]: (id: number | string) =>
    `/admin/security/video/${id}/update`,

  [AppRoutesEnum.STATISTIC]: () => '/admin/statistic',
  [AppRoutesEnum.ACCOUNTING]: () => '/admin/accounting',

  [AppRoutesEnum.ADMIN_NEWS]: () => '/admin/news',
  [AppRoutesEnum.ADMIN_EVENTS]: () => '/admin/events',
  [AppRoutesEnum.ADMIN_MEETINGS]: () => '/admin/meeting',
  [AppRoutesEnum.ADMIN_LOYALTY]: () => '/admin/loyalty',
  [AppRoutesEnum.ADMIN_NOTIFICATIONS]: () => '/admin/notifications',
  [AppRoutesEnum.ADMIN_TECHNICAL_WORKS]: () => '/admin/technical_works',
  [AppRoutesEnum.ADMIN_VOTING]: () => '/admin/voting',

  [AppRoutesEnum.CREATE_EVENT]: () => '/admin/events/create',
  [AppRoutesEnum.CREATE_MEETINGS]: () => '/admin/meeting/create',
  [AppRoutesEnum.CREATE_NEWS]: () => '/admin/news/create',

  [AppRoutesEnum.UPDATE_EVENT]: (id: number | string) => `/admin/events/${id}`,
  [AppRoutesEnum.UPDATE_MEETINGS]: (id: number | string) =>
    `/admin/meeting/${id}`,
  [AppRoutesEnum.UPDATE_NEWS]: (id: number | string) => `/admin/news/${id}`,

  [AppRoutesEnum.FORBIDDEN]: () => '/forbidden',

  [AppRoutesEnum.NOT_FOUND]: () => '*',
};
