import { AdminNewsListPage, CreateNewsPage } from "@pages/admin";
import { CreateEventPage, AdminEventsListPage } from "@pages/admin/Events";
import { UpdateEventPage } from "@pages/admin/Events/Update";
import { CreateMeetingPage, MeetingsListPage } from "@pages/admin/Meetings";
import { UpdateMeetingPage } from "@pages/admin/Meetings/Update";
import { UpdateNewsPage } from "@pages/admin/News/Update";
import { LoginPage, RegistrationPage } from "@pages/Auth";
import { CurrentEventPage } from "@pages/events";
import { EventsListPage } from "@pages/events/List";
import { ForbiddenPage } from "@pages/Forbidden";
import { MainPage } from "@pages/Main";
import { CurrentMeetingPage } from "@pages/meetings";
import { CurrentNewsPage } from "@pages/news";
import { NewsListPage } from "@pages/news/List";
import { NotFoundPage } from "@pages/NotFound";
import { AppRoutesEnum, AppRoutes } from "@shared/constants";
import { AppRoutesProps } from "@shared/types";

export const routeConfig: Record<AppRoutesEnum, AppRoutesProps> = {
  [AppRoutesEnum.ADMIN]: {
    path: AppRoutes[AppRoutesEnum.NEWS_CURRENT](":id"),
    element: <NotFoundPage />,
    authOnly: true,
  },
  [AppRoutesEnum.NEWS_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.NEWS_CURRENT](":id"),
    element: <CurrentNewsPage />,
    authOnly: false,
  },
  [AppRoutesEnum.EVENT_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.EVENT_CURRENT](":id"),
    element: <CurrentEventPage />,
    authOnly: false,
  },
  [AppRoutesEnum.MEETINGS_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.MEETINGS_CURRENT](":id"),
    element: <CurrentMeetingPage />,
    authOnly: false,
  },
  [AppRoutesEnum.ADMIN_NEWS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_NEWS](),
    element: <AdminNewsListPage />,
    authOnly: true,
  },
  [AppRoutesEnum.UPDATE_NEWS]: {
    path: AppRoutes[AppRoutesEnum.UPDATE_NEWS](":id"),
    element: <UpdateNewsPage />,
    authOnly: true,
  },
  [AppRoutesEnum.CREATE_NEWS]: {
    path: AppRoutes[AppRoutesEnum.CREATE_NEWS](),
    element: <CreateNewsPage />,
    authOnly: true,
  },
  [AppRoutesEnum.ADMIN_EVENTS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_EVENTS](),
    element: <AdminEventsListPage />,
    authOnly: true,
  },
  [AppRoutesEnum.UPDATE_EVENT]: {
    path: AppRoutes[AppRoutesEnum.UPDATE_EVENT](":id"),
    element: <UpdateEventPage />,
    authOnly: true,
  },
  [AppRoutesEnum.CREATE_EVENT]: {
    path: AppRoutes[AppRoutesEnum.CREATE_EVENT](),
    element: <CreateEventPage />,
    authOnly: true,
  },
  [AppRoutesEnum.ADMIN_MEETINGS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_MEETINGS](),
    element: <MeetingsListPage />,
    authOnly: true,
  },
  [AppRoutesEnum.UPDATE_MEETINGS]: {
    path: AppRoutes[AppRoutesEnum.UPDATE_MEETINGS](":id"),
    element: <UpdateMeetingPage />,
    authOnly: true,
  },
  [AppRoutesEnum.CREATE_MEETINGS]: {
    path: AppRoutes[AppRoutesEnum.CREATE_MEETINGS](),
    element: <CreateMeetingPage />,
    authOnly: true,
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
  [AppRoutesEnum.ADMIN_LOYALTY]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_LOYALTY](),
    element: <NotFoundPage />,
    authOnly: true,
  },
  [AppRoutesEnum.ADMIN_NOTIFICATIONS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_NOTIFICATIONS](),
    element: <NotFoundPage />,
    authOnly: true,
  },
  [AppRoutesEnum.ADMIN_TECHNICAL_WORKS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_TECHNICAL_WORKS](),
    element: <NotFoundPage />,
    authOnly: true,
  },
  [AppRoutesEnum.ADMIN_VOTING]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_VOTING](),
    element: <NotFoundPage />,
    authOnly: true,
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
    element: <NotFoundPage />,
    authOnly: false,
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
