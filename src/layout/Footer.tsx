import logo from "../../public/lawang.png";
import { getClick, setClick } from "@/lib/features/globalReducer";
import { useAppSelector, useAppDispatch } from "@/lib/features/hook";
import { Copyright, KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

const Footer = () => {
  const dispatch = useAppDispatch();
  const click = useAppSelector(getClick);

  return (
    <footer className="flex shadow-2xl w-full fixed bottom-0 z-10 bg-[#364f6b]  transform duration-500">
      <div>
        <div
          className="flex py-2 w-screen shadow-2xl cursor-pointer bg-[#364f6b] opacity-90 text-white font-thin items-center justify-between px-24"
          onClick={() => dispatch(setClick(!click))}
        >
          <div className="flex items-center">
            <Copyright />
            <span className="px-2">2023 Lawang .Inc</span>
          </div>
          <div className="flex">
            <span>Info lengkap</span>
            <div className={click ? "hidden" : "visible"}>
              <KeyboardArrowUp />
            </div>
            <div className={click ? "visible" : "hidden"}>
              <KeyboardArrowDown />
            </div>
          </div>
        </div>
        <div className={click ? "flex p-16" : "hidden"}>
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
      </div>
    </footer>
  );
};

export default Footer;
