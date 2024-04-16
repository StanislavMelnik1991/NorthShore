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
import { AppRoutesEnum, AppRoutes } from "@shared/constants";
import { AppRoutesProps } from "@shared/types";

export const routeConfig: Record<AppRoutesEnum, AppRoutesProps> = {
  [AppRoutesEnum.NEWS_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.NEWS_CURRENT](":id"),
    element: <CurrentNewsPage />,
    authOnly: true,
  },
  [AppRoutesEnum.EVENT_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.EVENT_CURRENT](":id"),
    element: <CurrentEventPage />,
    authOnly: true,
  },
  [AppRoutesEnum.MEETINGS_CURRENT]: {
    path: AppRoutes[AppRoutesEnum.MEETINGS_CURRENT](":id"),
    element: <CurrentMeetingPage />,
    authOnly: true,
  },
  [AppRoutesEnum.ADMIN_NEWS]: {
    path: AppRoutes[AppRoutesEnum.ADMIN_NEWS](),
    element: <NewsListPage />,
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
    element: <EventsListPage />,
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
    authOnly: true,
  },
  [AppRoutesEnum.REGISTRATION]: {
    path: AppRoutes[AppRoutesEnum.REGISTRATION](),
    element: <RegistrationPage />,
    authOnly: true,
  },
  [AppRoutesEnum.MAIN]: {
    path: AppRoutes[AppRoutesEnum.MAIN](),
    element: <MainPage />,
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

  [AppRoutesEnum.FORBIDDEN]: {
    path: AppRoutes[AppRoutesEnum.FORBIDDEN](),
    element: <ForbiddenPage />,
  },

  [AppRoutesEnum.NOT_FOUND]: {
    path: AppRoutes[AppRoutesEnum.NOT_FOUND](),
    element: <NotFoundPage />,
  },
};
