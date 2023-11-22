import SkeletonProduct from "@/components/product/SkeletonProduct";
import Banner from "@/components/product/Banner";
import Footer from "@/layout/Footer";

const Home = () => {

  return (
    <div>
      <Banner />
      <SkeletonProduct />
      <Footer />
    </div>
  );
};

export default Home;
