import { Fragment, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Loading from "@/components/Loading";

const App = lazy(() => import("../app/App"));
const Home = lazy(() => import("../pages/Home"));
const Setting = lazy(() => import("../layout/Setting"));
const Profile = lazy(() => import("../pages/setting/Profile"));
const Privacy = lazy(() => import("../pages/setting/Privacy"));
const ResetPassword = lazy(() => import("../components/auth/ResetPassword"));
import AddProperty from "@/pages/tenantProperty/propertyAdder";
import MainNavBarTenant from "@/components/mainNavBarTenant/mainNavBarTenant";
import TenantHome from "../pages/tenantHome";
import PropertyEditor from "@/pages/propertyEditor/propertyEditor";

const AppWrapper = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="/tenant" element={<TenantHome />} />
            <Route path="/tenant/propertyAdder" element={<AddProperty />} />
            <Route path= "/tenant/propertyEditor/:id" element={<PropertyEditor/>} />
        {/* <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} /> */}
          {/* <Route path="" element={<App />}>
            <Route path="" element={<Home />} /> */}

            <Route path="/setting" element={<Setting />}>
              <Route path="profile" element={<Profile />} />
              <Route path="privacy" element={<Privacy />} />
            </Route>
          </Route>
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default AppWrapper;
