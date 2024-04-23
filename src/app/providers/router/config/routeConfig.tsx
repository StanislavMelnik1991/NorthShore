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
  SecurityAccessPage,
  SecurityPage,
  SecurityVideoPage,
} from '@pages/Security';
import { AppRoutesEnum, AppRoutes, ROLES_ADMIN } from '@shared/constants';
import { AppRoutesProps } from '@shared/types';

export const routeConfig: Record<AppRoutesEnum, AppRoutesProps> = {
  [AppRoutesEnum.ADMIN]: {
    path: AppRoutes[AppRoutesEnum.ADMIN](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.ADMIN_NEWS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_NEWS](),
    element: <AdminNewsListPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.UPDATE_NEWS]: {
    path: AppRoutes[AppRoutesEnum.UPDATE_NEWS](':id'),
    element: <UpdateNewsPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.CREATE_NEWS]: {
    path: AppRoutes[AppRoutesEnum.CREATE_NEWS](),
    element: <CreateNewsPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.ADMIN_EVENTS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_EVENTS](),
    element: <AdminEventsListPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.UPDATE_EVENT]: {
    path: AppRoutes[AppRoutesEnum.UPDATE_EVENT](':id'),
    element: <UpdateEventPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.CREATE_EVENT]: {
    path: AppRoutes[AppRoutesEnum.CREATE_EVENT](),
    element: <CreateEventPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.ADMIN_MEETINGS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_MEETINGS](),
    element: <MeetingsListPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.UPDATE_MEETINGS]: {
    path: AppRoutes[AppRoutesEnum.UPDATE_MEETINGS](':id'),
    element: <UpdateMeetingPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.CREATE_MEETINGS]: {
    path: AppRoutes[AppRoutesEnum.CREATE_MEETINGS](),
    element: <CreateMeetingPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.ADMIN_LOYALTY]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_LOYALTY](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.ADMIN_NOTIFICATIONS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_NOTIFICATIONS](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.ADMIN_TECHNICAL_WORKS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_TECHNICAL_WORKS](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.ADMIN_VOTING]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_VOTING](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.ADMIN_SETTINGS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_SETTINGS](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.USERS]: {
    path: AppRoutes[AppRoutesEnum.USERS](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.PASSPORT]: {
    path: AppRoutes[AppRoutesEnum.PASSPORT](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.INFORM]: {
    path: AppRoutes[AppRoutesEnum.INFORM](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.INVOCATION]: {
    path: AppRoutes[AppRoutesEnum.INVOCATION](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.ENGINEERING]: {
    path: AppRoutes[AppRoutesEnum.ENGINEERING](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.SECURITY]: {
    path: AppRoutes[AppRoutesEnum.SECURITY](),
    element: <SecurityPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.SECURITY_ACCESS]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_ACCESS](),
    element: <SecurityAccessPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.SECURITY_INTERCOM]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_INTERCOM](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.SECURITY_VIDEO]: {
    path: AppRoutes[AppRoutesEnum.SECURITY_VIDEO](),
    element: <SecurityVideoPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },

  [AppRoutesEnum.STATISTIC]: {
    path: AppRoutes[AppRoutesEnum.STATISTIC](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
  },
  [AppRoutesEnum.ACCOUNTING]: {
    path: AppRoutes[AppRoutesEnum.ACCOUNTING](),
    element: <NotFoundPage />,
    authOnly: true,
    acceptedRoles: ROLES_ADMIN,
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
  [AppRoutesEnum.SHUTDOWNS]: {
    path: AppRoutes[AppRoutesEnum.SHUTDOWNS](),
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
