import { Suspense, memo } from "react";
import { ToastContainer } from "react-toastify";
import { Footer } from "@widgets/Footer";
import { Header } from "@widgets/Header";
import { MainLayout } from "@widgets/layouts";
import { SideBar } from "@widgets/SideBar";
import { useUser } from "@features/User/hook";
import { useAdminSidebarConfig, useUserSidebarConfig } from "@entities/config";
import { rolesAdminId } from "@shared/constants";
import { AppRouter } from "./providers/router";

const App = memo(() => {
  const { user } = useUser();
  const isAdmin = (user && rolesAdminId.includes(user?.group.id)) || false;
  const adminConfig = useAdminSidebarConfig();
  const userConfig = useUserSidebarConfig();
  const sidebar = isAdmin ? (
    <SideBar config={adminConfig} />
  ) : (
    <SideBar config={userConfig} />
  );
  return (
    <div className="app" id="app">
      <ToastContainer />
      <Suspense fallback="">
        <MainLayout
          header={<Header burgerMenu={sidebar} />}
          content={<AppRouter />}
          sidebar={sidebar}
          footer={<Footer />}
        />
      </Suspense>
    </div>
  );
});

export default App;
