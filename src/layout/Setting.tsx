import { Outlet } from "react-router";
import { AccountCircle, Favorite, Subject, History } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Setting = () => {
  return (
    <div className="flex">
      <div className="flex flex-col w-1/6 border rounded-xl mr-4">
        <Link to={"setting/profile"} className="text-2xl p-4">
          <AccountCircle style={{ fontSize: "40px" }} className="mr-4 text-blue-400" />
          Profil
        </Link>
        <Link to={"setting/favorite"} className="text-2xl p-4">
          <Favorite style={{ fontSize: "40px" }} className="mr-4 text-rose-500" />
          Favorit
        </Link>
        <Link to={"setting/favorite"} className="text-2xl p-4">
          <Subject style={{ fontSize: "40px" }} className="mr-4 " />
          Pesanan
        </Link>
        <Link to={"setting/favorite"} className="text-2xl p-4">
          <History style={{ fontSize: "40px" }} className="mr-4 " />
          Riwayat
        </Link>
      </div>
      <div className="w-4/5">{<Outlet />}</div>
    </div>
  );
};

export default Setting;
