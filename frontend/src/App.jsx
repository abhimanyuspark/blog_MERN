import { Suspense } from "react";
import { Loader } from "./components";
import { Home } from "./pages";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  );
}

export default App;
