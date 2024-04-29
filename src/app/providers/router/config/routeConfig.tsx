import {
  AdminNewsListPage,
  CreateNewsPage,
  UpdateMeetingPage,
  CreateEventPage,
  AdminEventsListPage,
  UpdateEventPage,
  CreateMeetingPage,
  MeetingsListPage,
  UpdateNewsPage,
} from '@pages/admin';
import { LoginPage, RegistrationPage } from '@pages/Auth';
import { CurrentEventPage } from '@pages/events';
import { EventsListPage } from '@pages/events';
import { ForbiddenPage } from '@pages/Forbidden';
import { RequestMainPage } from '@pages/invocation';
// import { ApplicationsMainPage } from '@pages/invocation/applications';
// import { CreateApplicationPage } from '@pages/invocation/applications/Create';
import { CreateRequestPage } from '@pages/invocation/requests/Create';
import { CurrentRequestPage } from '@pages/invocation/requests/Current';
import { MainPage } from '@pages/Main';
import { CurrentMeetingPage } from '@pages/meetings';
import { CurrentNewsPage } from '@pages/news';
import { NewsListPage } from '@pages/news';
import { NotFoundPage } from '@pages/NotFound';
import {
  CreateCameraPage,
  SecurityAccessPage,
  SecurityPage,
  SecurityVideoPage,
  CreateAccessPage,
  CreateIntercomPage,
  SecurityIntercomPage,
  CreateSlsIntercomPage,
  SecuritySlsIntercomPage,
  CurrentSlsIntercomPage,
  UpdateSlsIntercomPage,
  CurrentAccessPage,
  UpdateAccessPage,
  CurrentCameraPage,
  CurrentIntercomPage,
  UpdateCameraPage,
  UpdateIntercomPage,
} from '@pages/Security';
import {
  AppRoutesEnum,
  AppRoutes,
  ROLES_STAFF,
  ROLES_ADMIN,
} from '@shared/constants';
import { AppRoutesProps } from '@shared/types';

export const routeConfig: Record<AppRoutesEnum, AppRoutesProps> = {
  [AppRoutesEnum.ADMIN]: {
    path: AppRoutes[AppRoutesEnum.ADMIN](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_NEWS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_NEWS](),
    element: <AdminNewsListPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.UPDATE_NEWS]: {
    path: AppRoutes[AppRoutesEnum.UPDATE_NEWS](':id'),
    element: <UpdateNewsPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.CREATE_NEWS]: {
    path: AppRoutes[AppRoutesEnum.CREATE_NEWS](),
    element: <CreateNewsPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_EVENTS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_EVENTS](),
    element: <AdminEventsListPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.UPDATE_EVENT]: {
    path: AppRoutes[AppRoutesEnum.UPDATE_EVENT](':id'),
    element: <UpdateEventPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.CREATE_EVENT]: {
    path: AppRoutes[AppRoutesEnum.CREATE_EVENT](),
    element: <CreateEventPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_MEETINGS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_MEETINGS](),
    element: <MeetingsListPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.UPDATE_MEETINGS]: {
    path: AppRoutes[AppRoutesEnum.UPDATE_MEETINGS](':id'),
    element: <UpdateMeetingPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.CREATE_MEETINGS]: {
    path: AppRoutes[AppRoutesEnum.CREATE_MEETINGS](),
    element: <CreateMeetingPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_LOYALTY]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_LOYALTY](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_SERVICES]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_SERVICES](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_ADVERTISEMENT]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_ADVERTISEMENT](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_EMPLOYEE_ANNOUNCEMENTS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_EMPLOYEE_ANNOUNCEMENTS](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_NOTIFICATIONS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_NOTIFICATIONS](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_TECHNICAL_WORKS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_TECHNICAL_WORKS](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_VOTING]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_VOTING](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_SETTINGS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_SETTINGS](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.USERS]: {
    path: AppRoutes[AppRoutesEnum.USERS](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.PASSPORT]: {
    path: AppRoutes[AppRoutesEnum.PASSPORT](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.INFORM]: {
    path: AppRoutes[AppRoutesEnum.INFORM](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_REQUESTS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_REQUESTS](),
    element: <RequestMainPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_APPLICATIONS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_APPLICATIONS](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ADMIN_REQUESTS_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_REQUESTS_CURRENT](':id'),
    element: <CurrentRequestPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ENGINEERING]: {
    path: AppRoutes[AppRoutesEnum.ENGINEERING](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.SECURITY]: {
    path: AppRoutes[AppRoutesEnum.SECURITY](),
    element: <SecurityPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.SECURITY_ACCESS]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_ACCESS](),
    element: <SecurityAccessPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.SECURITY_ACCESS_CREATE]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_ACCESS_CREATE](),
    element: <CreateAccessPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.SECURITY_ACCESS_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_ACCESS_CURRENT](':id'),
    element: <CurrentAccessPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.SECURITY_ACCESS_UPDATE]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_ACCESS_UPDATE](':id'),
    element: <UpdateAccessPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },

  [AppRoutesEnum.SECURITY_INTERCOM]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_INTERCOM](),
    element: <SecurityIntercomPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.SECURITY_INTERCOM_CREATE]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_INTERCOM_CREATE](),
    element: <CreateIntercomPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.SECURITY_INTERCOM_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_INTERCOM_CURRENT](':id'),
    element: <CurrentIntercomPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.SECURITY_INTERCOM_UPDATE]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_INTERCOM_UPDATE](':id'),
    element: <UpdateIntercomPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },

  [AppRoutesEnum.SECURITY_SLS_INTERCOM]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_SLS_INTERCOM](),
    element: <SecuritySlsIntercomPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.SECURITY_SLS_INTERCOM_CREATE]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_SLS_INTERCOM_CREATE](),
    element: <CreateSlsIntercomPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.SECURITY_SLS_INTERCOM_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_SLS_INTERCOM_CURRENT](':id'),
    element: <CurrentSlsIntercomPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.SECURITY_SLS_INTERCOM_UPDATE]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_SLS_INTERCOM_UPDATE](':id'),
    element: <UpdateSlsIntercomPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },

  [AppRoutesEnum.SECURITY_VIDEO]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_VIDEO](),
    element: <SecurityVideoPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.SECURITY_VIDEO_CREATE]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_VIDEO_CREATE](),
    element: <CreateCameraPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.SECURITY_VIDEO_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_VIDEO_CURRENT](':id'),
    element: <CurrentCameraPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.SECURITY_VIDEO_UPDATE]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_VIDEO_UPDATE](':id'),
    element: <UpdateCameraPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },

  [AppRoutesEnum.STATISTIC]: {
    path: AppRoutes[AppRoutesEnum.STATISTIC](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.ACCOUNTING]: {
    path: AppRoutes[AppRoutesEnum.ACCOUNTING](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_STAFF,
  },
  [AppRoutesEnum.NEWS_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.NEWS_CURRENT](':id'),
    element: <CurrentNewsPage />,
    authOnly: false,
  },
  [AppRoutesEnum.EVENT_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.EVENT_CURRENT](':id'),
    element: <CurrentEventPage />,
    authOnly: false,
  },
  [AppRoutesEnum.MEETINGS_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.MEETINGS_CURRENT](':id'),
    element: <CurrentMeetingPage />,
    authOnly: false,
  },
  [AppRoutesEnum.LOGIN]: {
    path: AppRoutes[AppRoutesEnum.LOGIN](),
    element: <LoginPage />,
    authOnly: false,
  },
  [AppRoutesEnum.REGISTRATION]: {
    path: AppRoutes[AppRoutesEnum.REGISTRATION](),
    element: <RegistrationPage />,
    authOnly: false,
  },
  [AppRoutesEnum.MAIN]: {
    path: AppRoutes[AppRoutesEnum.MAIN](),
    element: <MainPage />,
    authOnly: false,
  },

  [AppRoutesEnum.NEWS]: {
    path: AppRoutes[AppRoutesEnum.NEWS](),
    element: <NewsListPage />,
    authOnly: false,
  },
  [AppRoutesEnum.POSTER]: {
    path: AppRoutes[AppRoutesEnum.POSTER](),
    element: <EventsListPage />,
    authOnly: false,
  },
  [AppRoutesEnum.ACTIVITY]: {
    path: AppRoutes[AppRoutesEnum.ACTIVITY](),
    element: <NotFoundPage />,
    authOnly: false,
  },
  [AppRoutesEnum.SERVICES]: {
    path: AppRoutes[AppRoutesEnum.SERVICES](),
    element: <NotFoundPage />,
    authOnly: false,
  },
  [AppRoutesEnum.REQUESTS]: {
    path: AppRoutes[AppRoutesEnum.REQUESTS](),
    element: <RequestMainPage />,
    authOnly: true,
    // acceptedRoles: [],
  },
  [AppRoutesEnum.REQUESTS_CREATE]: {
    path: AppRoutes[AppRoutesEnum.REQUESTS_CREATE](),
    element: <CreateRequestPage />,
    authOnly: true,
    // acceptedRoles: [],
  },
  [AppRoutesEnum.REQUESTS_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.REQUESTS_CURRENT](':id'),
    element: <CurrentRequestPage />,
    authOnly: true,
    // acceptedRoles: [],
  },
  [AppRoutesEnum.APPLICATIONS]: {
    path: AppRoutes[AppRoutesEnum.APPLICATIONS](),
    element: <NotFoundPage />,
    // element: <ApplicationsMainPage />,
    authOnly: true,
    // acceptedRoles: [],
  },
  [AppRoutesEnum.APPLICATIONS_CREATE]: {
    path: AppRoutes[AppRoutesEnum.APPLICATIONS_CREATE](),
    element: <NotFoundPage />,
    // element: <CreateApplicationPage />,
    authOnly: true,
    // acceptedRoles: [],
  },
  [AppRoutesEnum.TECHNICAL_WORKS]: {
    path: AppRoutes[AppRoutesEnum.TECHNICAL_WORKS](),
    element: <NotFoundPage />,
    authOnly: false,
  },
  [AppRoutesEnum.KNOWLEDGE]: {
    path: AppRoutes[AppRoutesEnum.KNOWLEDGE](),
    element: <NotFoundPage />,
    authOnly: false,
  },
  [AppRoutesEnum.SETTINGS]: {
    path: AppRoutes[AppRoutesEnum.SETTINGS](),
    element: <NotFoundPage />,
    authOnly: false,
  },

  [AppRoutesEnum.FORBIDDEN]: {
    path: AppRoutes[AppRoutesEnum.FORBIDDEN](),
    element: <ForbiddenPage />,
  },

  [AppRoutesEnum.NOT_FOUND]: {
    path: AppRoutes[AppRoutesEnum.NOT_FOUND](),
    element: <NotFoundPage />,
  },
};
