import Slider from "react-slick";
import image from "@/assets/images";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="my-8">
      <Slider {...settings}>
        <div>
          <img className="rounded-2xl p-2" src={image.ban1} alt="" />
        </div>
        <div>
          <img className="rounded-2xl p-2" src={image.ban2} alt="" />
        </div>
        <div>
          <img className="rounded-2xl p-2" src={image.ban3} alt="" />
        </div>
        <div>
          <img className="rounded-2xl p-2" src={image.ban4} alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
