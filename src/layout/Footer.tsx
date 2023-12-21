import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getHome } from "@/lib/features/globalReducer";
import { useAppSelector } from "@/lib/features/hook";
import { Copyright, KeyboardArrowUp } from "@mui/icons-material";
import logo from "../../public/lawang.png";

const Footer = () => {
  const home = useAppSelector(getHome);

  return (
    <Sheet>
      <SheetTrigger
        className={home ? "flex shadow-2xl w-full fixed bottom-0 z-10 bg-[#364f6b] transform duration-1000" : "hidden"}
      >
        <div className="flex py-2 w-screen shadow-2xl cursor-pointer opacity-90 text-white font-thin items-center justify-between px-24">
          <div className="flex items-center">
            <Copyright />
            <span className="px-2">2023 Lawang .Inc</span>
          </div>
          <div className="flex">
            <span>Info lengkap</span>
            <KeyboardArrowUp />
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="rounded-t-2xl bg-[#364f6b] text-white" side={"bottom"}>
        <div className="flex items-center pb-16">
          <div className="w-1/3 flex flex-row">
            <div className="items-center px-6">
              <img className="w-10" src={logo} alt="" />
              <h4 className=" text-2xl text-white">Lawang</h4>
            </div>
            <p>
              Lawang adalah tempat terbaik untuk menemukan resort impian Anda, didirikan sejak 1919 bersama Ny. Meneer
            </p>
          </div>

          <div className="w-1/3 flex">
            <div className="mx-auto">
              <h4 className="mb-4 text-2xl text-white">Dukungan</h4>
              <p>Pusat Bantuan</p>
              <p>Layanan Extra</p>
              <p>Kebutuhan Khusus</p>
              <p>Keluhan</p>
            </div>
          </div>

          <div className="w-1/3">
            <h4 className="mb-4 text-2xl text-white">Kontak</h4>
            <p>lawang.resortdream@proton.me</p>
            <p>0899 6655 7676</p>
            <p>Jl. Jenderal Sudirman Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Footer;
