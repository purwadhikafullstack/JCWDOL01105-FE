import { Outlet } from "react-router";
import { AccountCircle, Favorite, Receipt, History, Security } from "@mui/icons-material";
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
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:space-x-8 lg:flex-row h-[75vh]">
        <div className="flex lg:h-full w-full lg:space-y-8  space-x-4 lg:space-x-0 p-4 border rounded-xl items-center sm:justify-around md:flex-row lg:w-[240px] lg:flex-col lg:items-start md:text-2xl">
          <Link to={"/setting/profile"} className="sm:space-x-2 lg:p-4">
            <AccountCircle sx={{ fontSize: { xs: 32, sm: 32, md: 32, lg: 40 } }} className=" text-blue-500" />
            <span>Profil</span>
          </Link>
          <Link to={"/setting/favorite"} className="sm:space-x-2 lg:p-4">
            <Favorite sx={{ fontSize: { xs: 32, sm: 32, md: 32, lg: 40 } }} className="text-rose-500" />
            <span>Favorit</span>
          </Link>
          <Link to={"/setting/order"} className="sm:space-x-2 lg:p-4">
            <Receipt sx={{ fontSize: { xs: 32, sm: 32, md: 32, lg: 40 } }} className="" />
            <span>Transaksi</span>
          </Link>
          <Link to={"/setting/history"} className="sm:space-x-2 lg:p-4">
            <History sx={{ fontSize: { xs: 32, sm: 32, md: 32, lg: 40 } }} className="" />
            <span>Riwayat</span>
          </Link>
          <Link to={"/setting/privacy"} className="sm:space-x-2 lg:p-4">
            <Security sx={{ fontSize: { xs: 32, sm: 32, md: 32, lg: 40 } }} className="text-[#3FC1C9]" />
            <span>Privasi</span>
          </Link>
        </div>
        <div className="lg:w-4/5 md:h-[75vh]">{<Outlet />}</div>
      </div>
    </ProtectedRoute>
  );
};

export default Setting;
