import { Suspense, memo } from "react";
import { ToastContainer } from "react-toastify";
import { Header } from "@widgets/Header";
import { MainLayout } from "@widgets/layouts";
import { SideBar } from "@widgets/SideBar";
import { AppRouter } from "./providers/router";

const App = memo(() => {
  return (
    <div className="app">
      <ToastContainer />
      <Suspense fallback="">
        <MainLayout
          header={<Header burgerMenu={<SideBar />} />}
          content={<AppRouter />}
          sidebar={<SideBar />}
        />
      </Suspense>
    </div>
  );
});

export default App;
