import { Suspense, memo } from "react";
import { AppRouter } from "./providers/router";

const App = memo(() => {
  return (
    <Suspense fallback="">
      <div className="app">
        <AppRouter />
      </div>
    </Suspense>
  );
});

export default App;
