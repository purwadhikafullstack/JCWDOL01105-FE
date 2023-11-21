import SkeletonProduct from "@/components/product/SkeletonProduct";
import Banner from "@/components/product/Banner";
import { useEffect } from "react";
import { setHome, getHome, setClick } from "@/lib/features/globalReducer";
import { useAppSelector, useAppDispatch } from "@/lib/features/hook";

const Home = () => {
  const dispatch = useAppDispatch();
  const home = useAppSelector(getHome);

  useEffect(() => {
    dispatch(setHome(true));
  }, [home]);

  return (
    <>
      <div onClick={() => dispatch(setClick(false))}>
        <Banner />
        <SkeletonProduct />
      </div>
    </>
  );
};

export default Home;
