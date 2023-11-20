import { AuthContext } from "@/app/AuthContext";
import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { isLogin } = useContext(AuthContext);
  if (!isLogin) {
    return <Navigate to={"/"} />;
  } else {
    return <div>{children}</div>;
  }
};

export default ProtectedRoute;
