import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Skeleton } from "antd";

import { AuthorizedComponent, MAIN_ROUTES } from "./route";
import { TopFrame } from "./components/topframe";
import { Sidebar } from "./components/sidebar";

import "antd/dist/antd.css";

function App() {
  const data = AuthorizedComponent();
  console.log(data, "AuthorizedComponent");

  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <BrowserRouter>
      {isLoggedIn && <TopFrame navigation={MAIN_ROUTES} />}
      <main className="flex">
        <Suspense fallback={<Skeleton active={true} />}>
          <Routes>
            {data.map((route) => {
              const Component = route.component();
              return (
                <Route
                  path={route.path}
                  key={route.key}
                  element={<Component />}
                >
                  {/* {route?.nestedRoute
                    ? route?.nestedRoute.map((route) => {
                        const Element = route.component();
                        return (
                          <Route
                            path={route.path}
                            key={route.path}
                            element={<Element />}
                          />
                        );
                      })
                    : null} */}
                </Route>
              );
            })}
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}

export default App;
