import { Link, Outlet } from "react-router-dom";

import ToggleThemeBtn from "../components/ToggleThemeBtn";

import logo from "../assets/logo.svg";
import ScrollToTop from "../components/UI/ScrollToTop";

const RouteLayout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="grid min-h-screen grid-rows-layout">
        <header className="flex justify-between items-center py-2 px-4">
          <Link to="/">
            <img src={logo} alt="senthil cinema logo" width="128" />
          </Link>
          <ToggleThemeBtn />
        </header>

        {/* main */}
        <Outlet />

        <footer></footer>
      </div>
    </>
  );
};

export default RouteLayout;
