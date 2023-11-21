import { Fragment } from "react";
import { Outlet } from "react-router";

import Header from "@/layout/Header";

function App() {
  return (
    <Fragment>
      <Header />
      <div className="mx-auto px-10 my-8">{<Outlet />}</div>
    </Fragment>
  );
}

export default App;
