// import { AuthContextTenant } from "@/app/AuthContextTenant";
import { AuthContext } from "@/app/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteTenant = ({ children }: { children: React.ReactNode }) => {
  const { isLogin, role, id } = useContext(AuthContext);
  // const navigate = useNavigate();
  console.log(role);
  if (isLogin && role === "tenant") {
    return <div>{children}</div>;
  } else {
    return <Navigate to={"/tenantSignIn"} />;
  }
};

export default ProtectedRouteTenant;
