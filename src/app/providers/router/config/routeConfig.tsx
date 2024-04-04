import { NewsPage } from "@pages/admin";
import { ForbiddenPage } from "@pages/Forbidden";
import { MainPage } from "@pages/Main";
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
  getRouteAdminMeetings,
  getRouteAdminNotifications,
  getRouteAdminVoting,
  getRouteAdminLoyalty,
} from "@shared/constants";
import { AppRoutesProps } from "@shared/types";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
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
  [AppRoutes.ADMIN_EVENTS]: {
    path: getRouteAdminEvents(),
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_NEWS]: {
    path: getRouteAdminNews(),
    element: <NewsPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_LOYALTY]: {
    path: getRouteAdminLoyalty(),
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_MEETINGS]: {
    path: getRouteAdminMeetings(),
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_NOTIFICATIONS]: {
    path: getRouteAdminNotifications(),
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
