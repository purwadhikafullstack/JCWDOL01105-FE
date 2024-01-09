import { Fragment, useEffect } from "react";
import { Outlet } from "react-router";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { useAppSelector } from "@/lib/features/hook";
import { getHome } from "@/lib/features/globalReducer";

function App() {
  const home = useAppSelector(getHome);

  useEffect(() => {}, [home]);
  return (
    <Fragment>
      <Header />
      <div className="mx-auto px-10 mt-4 mb-20 text-slate-700 text-xl">{<Outlet />}</div>
      <Footer />
    </Fragment>
  );
}

export default App;
