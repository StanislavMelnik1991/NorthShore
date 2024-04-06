import { Suspense, memo } from "react";
import { Header } from "@widgets/Header";
import { SideBar } from "@widgets/SideBar";
import { MainLayout } from "@shared/layouts";
import { AppRouter } from "./providers/router";

const App = memo(() => {
  return (
    <div className="app">
      <Suspense fallback="">
        <MainLayout
          header={<Header />}
          content={<AppRouter />}
          sidebar={<SideBar />}
        />
      </Suspense>
    </div>
  );
});

export default App;
