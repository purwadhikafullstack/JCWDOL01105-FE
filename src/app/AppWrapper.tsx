import { Fragment, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Loading from "@/components/Loading";
import AddProperty from "@/pages/tenantProperty/tenantProperty";
import MainNavBarTenant from "@/components/mainNavBarTenant/mainNavBarTenant";
import App from "./App";
import TenantHome from "../pages/tenantHome";

// const Home = lazy(() => import("../pages/tenantHome"));

// import App from "./App";

const Home = lazy(() => import("../pages/Home"));

const AppWrapper = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <MainNavBarTenant/>
        <Routes>
          <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
            <Route path="/tenant" element={<TenantHome />} />
            <Route path="/tenant/propertyAdder" element={<AddProperty />} />
            <Route path="/tenant/propertyEditor" element={""} />
        {/* <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default AppWrapper;
