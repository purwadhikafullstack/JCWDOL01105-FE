import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/AuthContext";
import { useGetAPI } from "@/lib/service";

const LoginAuthSuccess = () => {
  const { loginGoogle } = useContext(AuthContext);
  const { data, isSuccess } = useGetAPI("/auth/login/success", "credential", { withCredentials: true });
  useEffect(() => {
    if (isSuccess) {
      loginGoogle(data);
    }
  }, [data]);
  return <div></div>;
};

export default LoginAuthSuccess;
