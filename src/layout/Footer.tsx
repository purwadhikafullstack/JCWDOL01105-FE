import logo from "../../public/lawang.png";

const Footer = () => {
  return (
    <footer className="grid grid-cols-3 px-12 py-16 shadow-2xl">
      <div>
        <div className="flex items-center mb-4">
          <img className="w-10" src={logo} alt="" />
          <h4 className=" text-2xl text-white">Lawang</h4>
        </div>
        <p>Lawang adalah tempat terbaik untuk menemukan resort impian Anda, didirikan sejak 1919 bersama Ny. Meneer</p>
      </div>

      <div className="mx-auto">
        <h4 className="mb-4 text-2xl text-white">Dukungan</h4>
        <p>Pusat Bantuan</p>
        <p>Layanan Extra</p>
        <p>Kebutuhan Khusus</p>
        <p>Keluhan</p>
      </div>
      <div>
        <h4 className="mb-4 text-2xl text-white">Kontak</h4>
        <p>lawang.resortdream@proton.me</p>
        <p>0899 6655 7676</p>
        <p>Jl. Jenderal Sudirman Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta</p>
      </div>
      <a></a>
    </footer>
  );
};

export default Footer;
