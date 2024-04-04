import { Suspense, memo } from "react";
import { AppRouter } from "./providers/router";

const App = memo(() => {
  return (
    <Suspense fallback="">
      <div className="content-page">
        <AppRouter />
      </div>
    </Suspense>
  );
});

export default App;
