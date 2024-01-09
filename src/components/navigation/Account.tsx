import { Menu, AccountCircle, Brightness6, LightMode, DarkMode } from "@mui/icons-material";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/app/AuthContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { useGetAPI } from "@/lib/service";
import { random } from "@/lib/features/globalReducer";
import { useAppSelector } from "@/lib/features/hook";
import RegisterDialog from "@/components/auth/RegisterDialog";
import LoginDialog from "@/components/auth/LoginDialog";

const ProfilePicture = () => {
  const { bearer } = useContext(AuthContext);
  const { data, isFetched, refetch } = useGetAPI(`/api/user/id`, "profile-picture", bearer);
  const rand = useAppSelector(random);

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 200);
  }, [rand, refetch]);
  return <Avatar className="ring-2 ring-[#FC5185] w-8 h-8">{isFetched && <AvatarImage src={data.image_url} />}</Avatar>;
};

const Account = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [route, setRoute] = useState("");

  const { isLogin, logoutGoogle } = useContext(AuthContext);
  useEffect(() => {
    const mode = darkMode ? "dark" : "light";
    localStorage.setItem("mode", mode);
  }, [darkMode]);

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    document.documentElement.classList.add(String(mode));
    return () => {
      document.documentElement.classList.remove(String(mode));
    };
  }, [darkMode]);

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <div className="flex">
        <div className="items-center mr-4 hidden lg:flex" onClick={() => setDarkMode(!darkMode)}>
          <Brightness6 className="cursor-pointer" fontSize="large" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="border border-slate rounded-full w-24 flex items-center justify-around p-2">
            <Menu />
            {isLogin ? <ProfilePicture /> : <AccountCircle fontSize="large" />}
          </DropdownMenuTrigger>
          {isLogin ? (
            <DropdownMenuContent className="w-[200px]">
              <div className="p-2">
                <DropdownMenuItem className="text-md font-medium py-2 cursor-pointer">
                  <Link className="w-full" to="/setting/favorite">
                    Favorit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-md font-medium py-2 cursor-pointer">
                  <Link className="w-full" to="/setting/order">
                    Transaksi
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-md font-medium py-2 cursor-pointer">
                  <Link className="w-full" to="/setting/history">
                    Riwayat
                  </Link>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="bg-slate-300" />
              <div className="p-2">
                <DropdownMenuItem className="text-md font-thin py-2">
                  <Link className="w-full" to="/tenantSignIn">
                    Sewakan Properti
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-md font-thin py-2">
                  <Link className="w-full " to={"/setting/profile"}>
                    Akun
                  </Link>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="bg-slate-300" />
              <div className="p-2">
                <DropdownMenuItem className="flex lg:hidden">
                  <div className="flex">
                    <Switch
                      className="items-center mr-4 flex lg:hidden cursor-pointer"
                      onClick={() => setDarkMode(!darkMode)}
                    ></Switch>
                    <div className={darkMode ? "hidden" : "lg:visible text-yellow-400"}>
                      <LightMode />
                    </div>
                    <div className={darkMode ? "lg:visible text-yellow-400" : "hidden"}>
                      <DarkMode />
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="text-md font-thin cursor-pointer py-2" onClick={() => logoutGoogle()}>
                  Keluar
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent className="w-[200px]">
              <div className="p-2">
                <DropdownMenuItem
                  onClick={() => {
                    setIsEditDialogOpen(true);
                    setRoute("RegisterDialog");
                  }}
                  className="text-md py-2 cursor-pointer"
                >
                  Daftar
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    setIsEditDialogOpen(true);
                    setRoute("Login");
                  }}
                  className="text-md font-medium py-2 cursor-pointer"
                >
                  Masuk
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="bg-slate-300" />

              <div className="p-2">
                <DropdownMenuItem className="text-md font-thin py-2 cursor-pointer"> <Link className="w-full" to="/tenantSignIn">
                    Sewakan Properti
                  </Link></DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
      {route === "RegisterDialog" ? <RegisterDialog /> : <LoginDialog />}
    </Dialog>
  );
};

export default Account;
