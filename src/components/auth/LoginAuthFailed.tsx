import { useEffect } from "react";
import { useGetAPI } from "@/lib/service";
import { useNavigate } from "react-router";

const LoginAuthFailed = () => {
  const navigate = useNavigate();
  const { isError } = useGetAPI("/auth/login/failed", "credential", { withCredentials: true });
  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, []);

  return (
    <div>
      <p>Login Anda bermasalah</p>
      <p>Kembali ke halaman utama dalam 5 detik</p>
    </div>
  );
};

export default LoginAuthFailed;
