import { Fragment } from "react";
import { Outlet } from "react-router";

function App() {
  return (
    <Fragment>
      <div>{<Outlet />}</div>
    </Fragment>
  );
}

export default App;
