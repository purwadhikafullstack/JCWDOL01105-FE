import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { Separator } from "@/components/ui/separator";
import { DropdownCalendar } from "@/components/ui/custom-calendar";
import { Menu, AccountCircle, Search, CalendarMonth, AddLocationAlt } from "@mui/icons-material";
import { Input } from "@/components/ui/input";

import logo from "../assets/lawang.png";
const Header = () => {
  const isLogin = false;
  const [date, setDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

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
    <nav className=" flex px-20 py-4 justify-between border-b sticky top-0 w-full bg-white">
      <Link className="flex items-center" to={"/"}>
        <img className="w-12" src={logo} alt="" />
        <span className="text-3xl text-blue-400">Lawang</span>
      </Link>

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

      <DropdownMenu>
        <DropdownMenuTrigger className="border border-slate rounded-full w-20 flex items-center justify-around px-2">
          <Menu />
          <AccountCircle />
        </DropdownMenuTrigger>
        {isLogin ? (
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuItem>
              <span className="font-medium">Pesanan</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="font-normal">Favorit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="font-thin">Riwayat</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="font-thin">Sewakan Properti</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="font-thin">Pengaturan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="font-thin">Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent>
            <DropdownMenuItem>Daftar</DropdownMenuItem>
            <DropdownMenuItem>Masuk</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="font-thin">Sewakan Properti</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
      {/* <Switch id="theme-mode" checked={darkMode} onCheckedChange={() => setDarkMode(!darkMode)} /> */}
    </nav>
  );
};

export default Header;
