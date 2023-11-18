import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Separator } from "@/components/ui/separator";
import { DropdownCalendar } from "@/components/ui/custom-calendar";
import { Menu, AccountCircle, Search, CalendarMonth, AddLocationAlt, Brightness6 } from "@mui/icons-material";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { useGetAPI } from "@/lib/service";
import { AuthContext } from "@/app/AuthContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Register from "@/components/auth/Register";
import Login from "@/components/auth/Login";
import logo from "../../public/lawang.png";

const Header = () => {
  const [route, setRoute] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const { imageUrl, isLogin, loginGoogle } = useContext(AuthContext);
  const googleLogout = () => {
    window.open(`${import.meta.env.VITE_BASE_URL}/auth/logout`, "_self");
    sessionStorage.removeItem("token");
  };
  const { data, isSuccess } = useGetAPI("/auth/login/success", "credential", { withCredentials: true });

  useEffect(() => {
    const mode = darkMode ? "dark" : "light";
    localStorage.setItem("mode", mode);
    if (isSuccess) {
      loginGoogle(data);
    }
  }, [darkMode, isSuccess]);

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    document.documentElement.classList.add(String(mode));
    return () => {
      document.documentElement.classList.remove(String(mode));
    };
  }, [darkMode]);

  return (
    <nav className="dark:bg-background flex px-20 py-4 justify-between border-b sticky z-10 top-0 w-full bg-white">
      <Link className="flex items-center" to={"/"}>
        <img className="w-12" src={logo} alt="" />
        <span className="text-3xl" style={{ color: "#3FC1C9" }}>
          Lawang
        </span>
      </Link>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <div className="flex w-1/2 justify-around border border-slate rounded-full">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              <AddLocationAlt />
              Lokasi
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenu>
                <DropdownMenuTrigger>Kota</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Bandung</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              <CalendarMonth /> Tanggal
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex">
              <DropdownCalendar
                mode="range"
                captionLayout="dropdown-buttons"
                selected={date}
                onSelect={setDate}
                fromYear={1960}
                toYear={2030}
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              <Search />
              Cari...
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex">
              <Input />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex">
          <div className="flex items-center mr-4" onClick={() => setDarkMode(!darkMode)}>
            <Brightness6 className="cursor-pointer" fontSize="large" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="border border-slate rounded-full w-24 flex items-center justify-around px-2">
              <Menu />
              {isLogin ? (
                <Avatar className="w-8 h-8">
                  <AvatarImage className="ring-4 ring-blue-600" src={imageUrl as string} />
                </Avatar>
              ) : (
                <AccountCircle fontSize="large" />
              )}
            </DropdownMenuTrigger>
            {isLogin ? (
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem className="text-md font-medium">Pesanan</DropdownMenuItem>
                <DropdownMenuItem className="text-md font-medium">Favorit</DropdownMenuItem>
                <DropdownMenuItem className="text-md font-medium">Riwayat</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-md font-thin">Properti</DropdownMenuItem>
                <DropdownMenuItem className="text-md font-thin">Pengaturan</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-md font-thin" onClick={googleLogout}>
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem
                  onClick={() => {
                    setIsEditDialogOpen(true);
                    setRoute("Register");
                  }}
                  className="text-md font-medium"
                >
                  Daftar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setIsEditDialogOpen(true);
                    setRoute("Login");
                  }}
                  className="text-md font-medium"
                >
                  Masuk
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-md font-thin">Sewakan Properti</DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
        {route === "Register" ? <Register /> : <Login />}
      </Dialog>
    </nav>
  );
};

export default Header;
