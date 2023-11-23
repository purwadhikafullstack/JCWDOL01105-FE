import { Fragment } from "react";
import { Outlet } from "react-router";
import { setClick } from "@/lib/features/globalReducer";
import { useAppDispatch } from "@/lib/features/hook";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

function App() {
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <div onClick={() => dispatch(setClick(false))}>
        <Header />
        <div className="mx-auto px-10 my-8">{<Outlet />}</div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
