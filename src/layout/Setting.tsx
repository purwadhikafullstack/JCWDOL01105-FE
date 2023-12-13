import { Outlet } from "react-router";
import { AccountCircle, Favorite, Subject, History, Security } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { setHome, getHome } from "@/lib/features/globalReducer";
import { useAppSelector, useAppDispatch } from "@/lib/features/hook";
import { useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const Setting = () => {
  const dispatch = useAppDispatch();
  const home = useAppSelector(getHome);

  useEffect(() => {
    dispatch(setHome(false));
  }, [home]);

  return (
    <ProtectedRoute>
      <div className="flex flex-col lg:flex-row h-[75vh]">
        <div className="flex lg:h-full w-full mb-8 p-2 border rounded-xl items-center sm:justify-around md:flex-row lg:w-[260px] lg:mr-8 lg:flex-col lg:items-start ">
          <Link to={"/setting/profile"} className="p-2 md:text-md lg:p-4 lg:text-2xl lg:w-full items-center">
            <AccountCircle sx={{ fontSize: { xs: 32, sm: 32, md: 32, lg: 40 } }} className="lg:mr-4 text-blue-500" />
            Profil
          </Link>
          <Link to={"/setting/favorite"} className="p-2 md:text-md lg:p-4 lg:text-2xl lg:w-full items-center">
            <Favorite sx={{ fontSize: { xs: 32, sm: 32, md: 32, lg: 40 } }} className="lg:mr-4 text-rose-500" />
            Favorit
          </Link>
          <Link to={"/setting/order"} className="p-2 md:text-md lg:p-4 lg:text-2xl lg:w-full items-center">
            <Subject sx={{ fontSize: { xs: 32, sm: 32, md: 32, lg: 40 } }} className="lg:mr-4 " />
            Pesanan
          </Link>
          <Link to={"/setting/history"} className="p-2 md:text-md lg:p-4 lg:text-2xl lg:w-full items-center">
            <History sx={{ fontSize: { xs: 32, sm: 32, md: 32, lg: 40 } }} className="lg:mr-4 " />
            Riwayat
          </Link>
          <Link to={"/setting/privacy"} className="p-2 md:text-md lg:p-4 lg:text-2xl lg:w-full items-center">
            <Security sx={{ fontSize: { xs: 32, sm: 32, md: 32, lg: 40 } }} className="lg:mr-4 text-[#3FC1C9]" />
            Privasi
          </Link>
        </div>
        <div className="lg:w-4/5 h-[75vh]">{<Outlet />}</div>
      </div>
    </ProtectedRoute>
  );
};

export default Setting;
