import { Suspense, memo } from "react";
import { ToastContainer } from "react-toastify";
import { Footer } from "@widgets/Footer";
import { Header } from "@widgets/Header";
import { MainLayout } from "@widgets/layouts";
import { SideBar } from "@widgets/SideBar";
import { AppRouter } from "./providers/router";

const App = memo(() => {
  return (
    <div className="app" id="app">
      <ToastContainer />
      <Suspense fallback="">
        <MainLayout
          header={<Header burgerMenu={<SideBar />} />}
          content={<AppRouter />}
          sidebar={<SideBar />}
          footer={<Footer />}
        />
      </Suspense>
    </div>
  );
});

export default App;
