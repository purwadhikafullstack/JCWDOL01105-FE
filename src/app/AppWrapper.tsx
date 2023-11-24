import { Fragment, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Loading from "@/components/Loading";

const App = lazy(() => import("../app/App"));
const Home = lazy(() => import("../pages/Home"));
const Setting = lazy(() => import("../layout/Setting"));
const Profile = lazy(() => import("../pages/setting/Profile"));
const ProtectedRoute = lazy(() => import("../components/auth/ProtectedRoute"));
const Privacy = lazy(() => import("../pages/setting/Privacy"));
import AddProperty from "@/pages/tenantProperty/tenantProperty";
import MainNavBarTenant from "@/components/mainNavBarTenant/mainNavBarTenant";
import TenantHome from "../pages/tenantHome";

const AppWrapper = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="/tenant" element={<TenantHome />} />
            <Route path="/tenant/propertyAdder" element={<AddProperty />} />
            <Route path="/tenant/propertyEditor" element={""} />
            <Route path="/setting" element={<Setting />}>
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="privacy"
                element={
                  <ProtectedRoute>
                    <Privacy />
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
