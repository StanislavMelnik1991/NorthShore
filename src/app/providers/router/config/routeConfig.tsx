import { NewsListPage, CreateNewsPage } from "@pages/admin";
import { CreateEventPage, EventsListPage } from "@pages/admin/Events";
import { UpdateEventPage } from "@pages/admin/Events/Update";
import { CreateMeetingPage, MeetingsListPage } from "@pages/admin/Meetings";
import { UpdateMeetingPage } from "@pages/admin/Meetings/Update";
import { UpdateNewsPage } from "@pages/admin/News/Update";
import { LoginPage, RegistrationPage } from "@pages/Auth";
import { CurrentEventPage } from "@pages/events";
import { ForbiddenPage } from "@pages/Forbidden";
import { MainPage } from "@pages/Main";
import { CurrentMeetingPage } from "@pages/meetings";
import { CurrentNewsPage } from "@pages/news";
import { NotFoundPage } from "@pages/NotFound";
import {
  AppRoutes,
  getRouteMain,
  getRouteSettings,
  getRouteAbout,
  getRouteProfile,
  getRouteForbidden,
  getRouteAdminNews,
  getRouteAdminEvents,
  getRouteAdminNotifications,
  getRouteAdminVoting,
  getRouteAdminLoyalty,
  getRouteAdminTechnicalWorks,
  getRouteCreateNews,
  getRouteLogin,
  getRouteRegistration,
  getRouteUpdateNews,
  getRouteCurrentNews,
  getRouteCreateEvent,
  getRouteUpdateEvent,
  getRouteCurrentEvent,
  getRouteAdminMeeting,
  getRouteUpdateMeeting,
  getRouteCreateMeeting,
  getRouteCurrentMeeting,
} from "@shared/constants";
import { AppRoutesProps } from "@shared/types";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.NEWS_CURRENT]: {
    path: getRouteCurrentNews(":id"),
    element: <CurrentNewsPage />,
    authOnly: true,
  },
  [AppRoutes.EVENT_CURRENT]: {
    path: getRouteCurrentEvent(":id"),
    element: <CurrentEventPage />,
    authOnly: true,
  },
  [AppRoutes.MEETINGS_CURRENT]: {
    path: getRouteCurrentMeeting(":id"),
    element: <CurrentMeetingPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_NEWS]: {
    path: getRouteAdminNews(),
    element: <NewsListPage />,
    authOnly: true,
  },
  [AppRoutes.UPDATE_NEWS]: {
    path: getRouteUpdateNews(":id"),
    element: <UpdateNewsPage />,
    authOnly: true,
  },
  [AppRoutes.CREATE_NEWS]: {
    path: getRouteCreateNews(),
    element: <CreateNewsPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_EVENTS]: {
    path: getRouteAdminEvents(),
    element: <EventsListPage />,
    authOnly: true,
  },
  [AppRoutes.UPDATE_EVENT]: {
    path: getRouteUpdateEvent(":id"),
    element: <UpdateEventPage />,
    authOnly: true,
  },
  [AppRoutes.CREATE_EVENT]: {
    path: getRouteCreateEvent(),
    element: <CreateEventPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_MEETINGS]: {
    path: getRouteAdminMeeting(),
    element: <MeetingsListPage />,
    authOnly: true,
  },
  [AppRoutes.UPDATE_MEETINGS]: {
    path: getRouteUpdateMeeting(":id"),
    element: <UpdateMeetingPage />,
    authOnly: true,
  },
  [AppRoutes.CREATE_MEETINGS]: {
    path: getRouteCreateMeeting(),
    element: <CreateMeetingPage />,
    authOnly: true,
  },
  [AppRoutes.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
    authOnly: true,
  },
  [AppRoutes.REGISTRATION]: {
    path: getRouteRegistration(),
    element: <RegistrationPage />,
    authOnly: true,
  },
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.SETTINGS]: {
    path: getRouteSettings(),
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: getRouteAbout(),
    element: <MainPage />,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(":id"),
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_LOYALTY]: {
    path: getRouteAdminLoyalty(),
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_NOTIFICATIONS]: {
    path: getRouteAdminNotifications(),
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_TECHNICAL_WORKS]: {
    path: getRouteAdminTechnicalWorks(),
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_VOTING]: {
    path: getRouteAdminVoting(),
    element: <MainPage />,
    authOnly: true,
  },

  [AppRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },

  [AppRoutes.NOT_FOUND]: {
    path: "*",
    element: <NotFoundPage />,
  },
};
