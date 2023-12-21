import { Fragment, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Loading from "@/components/Loading";

const App = lazy(() => import("../app/App"));
const Home = lazy(() => import("../pages/Home"));
const Setting = lazy(() => import("../layout/Setting"));
const Profile = lazy(() => import("../pages/setting/Profile"));
const Order = lazy(() => import("../pages/setting/Order"));
const Privacy = lazy(() => import("../pages/setting/Privacy"));
const Favorite = lazy(() => import("../pages/setting/Favorite"));
const ResetPassword = lazy(() => import("../components/auth/ResetPassword"));
const PropertyDetail = lazy(() => import("../pages/property/PropertyDetail"));
const RoomDetail = lazy(() => import("../pages/property/RoomDetail"));

const OrderDetail = lazy(() => import("../pages/setting/OrderDetail"));
const TransactionSuccess = lazy(() => import("../pages/TransactionSuccess"));
const TenantHome = lazy(() => import("../pages/tenantHome"));
const PropertyEditor = lazy(() => import("../pages/propertyEditor/propertyEditor"));
const AddProperty = lazy(() => import("../pages/tenantProperty/propertyAdder"));
const TenantSignIn = lazy(() => import("../pages/tenantProperty/tenantSignIn"));
const LoginAuthSuccess = lazy(() => import("../components/auth/LoginAuthSuccess"));
const LoginAuthFailed = lazy(() => import("../components/auth/LoginAuthFailed"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppWrapper = () => {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="/login-auth-success" element={<LoginAuthSuccess />} />
            <Route path="/login-auth-failed" element={<LoginAuthFailed />} />

            <Route path="property/:id" element={<PropertyDetail />} />
            <Route path="room/:id" element={<RoomDetail />} />
            <Route path="transaction-success" element={<TransactionSuccess />} />

            <Route path="/tenant" element={<TenantHome />} />
            <Route path="/tenant/propertyAdder" element={<AddProperty />} />
            <Route path="/tenant/propertyEditor/:id" element={<PropertyEditor />} />
            <Route path="/tenantSignIn" element={<TenantSignIn />} />

            <Route path="property/:id" element={<PropertyDetail />} />
            <Route path="room/:id" element={<RoomDetail />} />

            <Route path="/setting" element={<Setting />}>
              <Route path="profile" element={<Profile />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="order" element={<Order />} />
              <Route path="order/:id" element={<OrderDetail />} />
              <Route path="favorite" element={<Favorite />} />
            </Route>
          </Route>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default AppWrapper;
