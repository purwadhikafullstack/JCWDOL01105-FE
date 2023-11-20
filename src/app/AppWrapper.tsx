import { Fragment, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Loading from "@/components/Loading";

const App = lazy(() => import("../app/App"));
const Home = lazy(() => import("../pages/Home"));
const Setting = lazy(() => import("../layout/Setting"));
const Profile = lazy(() => import("../pages/Profile"));
const ProtectedRoute = lazy(() => import("../components/auth/ProtectedRoute"));
import Location from "@/pages/Location";

const AppWrapper = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="location" element={<Location />} />

            <Route path="/setting" element={<Setting />}>
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default AppWrapper;
