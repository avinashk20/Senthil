import { Link, Outlet, useNavigation } from "react-router-dom";

import ToggleThemeBtn from "../components/ToggleThemeBtn";

import logo from "../assets/logo.svg";
import ScrollToTop from "../components/UI/ScrollToTop";
import LoadingDots from "../components/UI/LoadingDots";

const RouteLayout = () => {
  const { state: navigationState } = useNavigation();

  return (
    <>
      <ScrollToTop />
      <div className="grid min-h-screen grid-rows-layout">
        <header className="flex justify-between items-center py-2 px-4 sm:px-16 shadow-sm">
          <Link to="/">
            <img src={logo} alt="senthil cinema logo" width="128" />
          </Link>
          <ToggleThemeBtn />
        </header>

        {/* main */}
        {navigationState === "loading" && <LoadingDots />}
        {navigationState === "idle" && <Outlet />}

        <footer>
          @avinashk20 
        </footer>
      </div>
    </>
  );
};

export default RouteLayout;