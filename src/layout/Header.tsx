import { Link } from "react-router-dom";
import SearchField from "@/components/navigation/SearchField";
import Account from "@/components/navigation/Account";
import image from "@/assets/images";
import { useAppSelector } from "@/lib/features/hook";
import { getHome } from "@/lib/features/globalReducer";

const Header = () => {
  const home = useAppSelector(getHome);

  return (
    <nav className="h-[12dvh] dark:bg-background flex px-4 md:px-12 py-4 lg:px-20 justify-between border-b sticky z-10 top-0 w-full bg-white items-center">
      <div>
        <Link className="flex items-center" to={"/"}>
          <img className="w-12" src={image.logo} alt="logo" />
          <span className="text-3xl" style={{ color: "#3FC1C9" }}>
            Lawang
          </span>
        </Link>
      </div>

      <div className={home ? "" : "hidden"}>
        <SearchField />
      </div>

      <div>
        <Account />
      </div>
    </nav>
  );
};

export default Header;
