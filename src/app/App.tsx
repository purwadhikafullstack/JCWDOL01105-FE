import { Fragment } from "react";
import { Outlet } from "react-router";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

function App() {
  return (
    <Fragment>
      <Header />
      <div className="mx-auto px-10 my-8  static">{<Outlet />}</div>
      <Footer />
    </Fragment>
  );
}

export default App;
