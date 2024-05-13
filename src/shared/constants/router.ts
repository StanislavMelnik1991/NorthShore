export enum AppRoutesEnum {
  // User pages
  NEWS_CURRENT,
  EVENT_CURRENT,
  MAIN,
  FORBIDDEN,
  NEWS,
  POSTER,
  ACTIVITY_VOTING,
  ACTIVITY_VOTING_CURRENT,
  ACTIVITY_MEETINGS,
  ACTIVITY_MEETINGS_CURRENT,
  SERVICES,

  REQUESTS,
  REQUESTS_CURRENT,
  REQUESTS_CREATE,
  APPLICATIONS,
  APPLICATIONS_CREATE,

  TECHNICAL_WORKS,
  KNOWLEDGE,
  SETTINGS,

  ADMIN,
  ADMIN_INFO_TECHNICAL_WORKS,
  ADMIN_INFO_ANNOUNCEMENTS,

  ACCOUNTING,
  STATISTIC,

  SECURITY,
  SECURITY_ACCESS,
  SECURITY_ACCESS_CREATE,
  SECURITY_ACCESS_UPDATE,
  SECURITY_ACCESS_CURRENT,

  SECURITY_SLS_INTERCOM,
  SECURITY_SLS_INTERCOM_CREATE,
  SECURITY_SLS_INTERCOM_UPDATE,
  SECURITY_SLS_INTERCOM_CURRENT,

  SECURITY_INTERCOM,
  SECURITY_INTERCOM_CREATE,
  SECURITY_INTERCOM_UPDATE,
  SECURITY_INTERCOM_CURRENT,

  SECURITY_VIDEO,
  SECURITY_VIDEO_CREATE,
  SECURITY_VIDEO_UPDATE,
  SECURITY_VIDEO_CURRENT,

  ENGINEERING,
  ENGINEERING_ENERGY,
  ENGINEERING_ENERGY_CURRENT,

  ENGINEERING_HEATING,
  ENGINEERING_LIFTS,

  INFORM,
  PASSPORT,
  USERS,
  ADMIN_SETTINGS,

  ADMIN_REQUESTS,
  ADMIN_REQUESTS_CURRENT,
  ADMIN_APPLICATIONS,

  ADMIN_NOTIFICATIONS,
  ADMIN_NOTIFICATIONS_CREATE,
  ADMIN_NOTIFICATIONS_CURRENT,

  ADMIN_TECHNICAL_WORKS,

  ADMIN_VOTING,
  ADMIN_VOTING_CREATE,
  ADMIN_VOTING_UPDATE,
  ADMIN_VOTING_UPDATE_QUESTIONS,
  ADMIN_VOTING_CURRENT,

  ADMIN_LOYALTY,
  ADMIN_SERVICES,
  ADMIN_ADVERTISEMENT,
  ADMIN_EMPLOYEE_ANNOUNCEMENTS,
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
  [AppRoutesEnum.ADMIN_INFO_TECHNICAL_WORKS]: () =>
    '/admin/info/technical_works',
  [AppRoutesEnum.ADMIN_INFO_ANNOUNCEMENTS]: () => '/admin/info/announcements',
  [AppRoutesEnum.EVENT_CURRENT]: (id: number | string) => `/event/${id}`,
  [AppRoutesEnum.ACTIVITY_MEETINGS_CURRENT]: (id: number | string) =>
    `/meeting/${id}`,
  [AppRoutesEnum.LOGIN]: () => '/login',
  [AppRoutesEnum.REGISTRATION]: () => '/registration',
  [AppRoutesEnum.NEWS]: () => '/news',
  [AppRoutesEnum.NEWS_CURRENT]: (id: number | string) => `/news/${id}`,
  [AppRoutesEnum.POSTER]: () => '/poster',
  [AppRoutesEnum.ACTIVITY_MEETINGS]: () => '/activity/meetings',
  [AppRoutesEnum.ACTIVITY_VOTING]: () => '/activity/voting',
  [AppRoutesEnum.ACTIVITY_VOTING_CURRENT]: (id: number | string) =>
    `/activity/voting/${id}`,
  [AppRoutesEnum.SERVICES]: () => '/services',

  [AppRoutesEnum.REQUESTS]: () => '/requests',
  [AppRoutesEnum.REQUESTS_CREATE]: () => '/requests/create',
  [AppRoutesEnum.REQUESTS_CURRENT]: (id: number | string) => `/requests/${id}`,
  [AppRoutesEnum.APPLICATIONS]: () => '/applications',
  [AppRoutesEnum.APPLICATIONS_CREATE]: () => '/applications/create',

  [AppRoutesEnum.TECHNICAL_WORKS]: () => '/technical_works',
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
  [AppRoutesEnum.ENGINEERING_ENERGY]: () => '/admin/engineering/energy',
  [AppRoutesEnum.ENGINEERING_ENERGY_CURRENT]: (id: number | string) =>
    `/admin/engineering/energy/${id}`,

  [AppRoutesEnum.ENGINEERING_HEATING]: () => '/admin/engineering/heating',
  [AppRoutesEnum.ENGINEERING_LIFTS]: () => '/admin/engineering/lifts',

  [AppRoutesEnum.SECURITY]: () => '/admin/security',

  [AppRoutesEnum.SECURITY_ACCESS]: () => '/admin/security/access',
  [AppRoutesEnum.SECURITY_ACCESS_CREATE]: () => '/admin/security/access/create',
  [AppRoutesEnum.SECURITY_ACCESS_CURRENT]: (id: number | string) =>
    `/admin/security/access/${id}`,
  [AppRoutesEnum.SECURITY_ACCESS_UPDATE]: (id: number | string) =>
    `/admin/security/access/${id}/update`,

  [AppRoutesEnum.SECURITY_INTERCOM]: () => '/admin/security/intercom',
  [AppRoutesEnum.SECURITY_INTERCOM_CREATE]: () =>
    '/admin/security/intercom/create',
  [AppRoutesEnum.SECURITY_INTERCOM_CURRENT]: (id: number | string) =>
    `/admin/security/intercom/${id}`,
  [AppRoutesEnum.SECURITY_INTERCOM_UPDATE]: (id: number | string) =>
    `/admin/security/intercom/${id}/update`,

  [AppRoutesEnum.SECURITY_SLS_INTERCOM]: () => '/admin/security/intercom/sls',
  [AppRoutesEnum.SECURITY_SLS_INTERCOM_CREATE]: () =>
    '/admin/security/intercom/sls/create',
  [AppRoutesEnum.SECURITY_SLS_INTERCOM_CURRENT]: (id: number | string) =>
    `/admin/security/intercom/sls/${id}`,
  [AppRoutesEnum.SECURITY_SLS_INTERCOM_UPDATE]: (id: number | string) =>
    `/admin/security/intercom/sls/${id}/update`,

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
  [AppRoutesEnum.ADMIN_SERVICES]: () => '/admin/services',
  [AppRoutesEnum.ADMIN_ADVERTISEMENT]: () => '/admin/advertisement',
  [AppRoutesEnum.ADMIN_EMPLOYEE_ANNOUNCEMENTS]: () =>
    '/admin/employee_announcements',
  [AppRoutesEnum.ADMIN_NOTIFICATIONS]: () => '/admin/notifications',
  [AppRoutesEnum.ADMIN_NOTIFICATIONS_CREATE]: () =>
    '/admin/notifications/create',
  [AppRoutesEnum.ADMIN_NOTIFICATIONS_CURRENT]: (id: number | string) =>
    `/admin/notifications/${id}`,

  [AppRoutesEnum.ADMIN_TECHNICAL_WORKS]: () => '/admin/technical_works',

  [AppRoutesEnum.ADMIN_VOTING]: () => '/admin/voting',
  [AppRoutesEnum.ADMIN_VOTING_CREATE]: () => '/admin/voting/create',
  [AppRoutesEnum.ADMIN_VOTING_UPDATE]: (id: number | string) =>
    `/admin/voting/${id}/update`,
  [AppRoutesEnum.ADMIN_VOTING_UPDATE_QUESTIONS]: (id: number | string) =>
    `/admin/voting/${id}/update/questions`,
  [AppRoutesEnum.ADMIN_VOTING_CURRENT]: (id: number | string) =>
    `/admin/voting/${id}`,

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
