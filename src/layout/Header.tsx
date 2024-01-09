import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib/features/hook";
import { getHome, setFacility } from "@/lib/features/globalReducer";
import { facilities } from "@/lib/constant";
import SearchField from "@/components/navigation/SearchField";
import Account from "@/components/navigation/Account";
import Slider from "react-slick";
import image from "@/assets/images";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 15,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 12,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 9,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 6,
        initialSlide: 1,
        dots: true,
      },
    },
  ],
};

const Header = () => {
  const dispatch = useAppDispatch();
  const home = useAppSelector(getHome);

  return (
    <nav className="sticky z-10 top-0 w-full bg-white dark:bg-background text-slate-700">
      <div className="h-[12dvh] flex px-4 md:px-12 py-4 lg:px-20 justify-between border-b items-center">
        <div>
          <Link className="flex items-center" to={"/"}>
            <img className="w-12" src={image.logo} alt="logo" />
            <span className="text-4xl text-[#3FC1C9]">Lawang</span>
          </Link>
        </div>

        <div className={home ? "" : "hidden"}>
          <SearchField />
        </div>

        <div>
          <Account />
        </div>
      </div>
      <div className={`${home ? "text-slate-400 cursor-pointer text-center px-4 py-2" : "hidden"}`}>
        <Slider {...settings}>
          {facilities.map((e) => (
            <div
              key={e.value}
              className="hover:bg-slate-300 hover:text-white ease-in-out rounded-lg p-1 duration-300"
              onClick={() => dispatch(setFacility(e.value))}
            >
              {e.icon}
            </div>
          ))}
        </Slider>
      </div>
    </nav>
  );
};

export default Header;
