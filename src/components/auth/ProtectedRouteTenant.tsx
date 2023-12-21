import { AuthContext } from "@/app/AuthContext";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRouteTenant = ({ children }: { children: React.ReactNode }) => {
  const { isLogin, role, token, id } = useContext(AuthContext);
  const navigate = useNavigate();
  if (isLogin && role == "tenant") {
    return <div>{children}</div>;
  } else {
    return <Navigate to={"/tenantSignIn"} />;
  }
};

export default ProtectedRouteTenant;
