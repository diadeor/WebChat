import logo from "../assets/sg_colored.svg";
import { Link } from "react-router-dom";
import Buttons from "./Buttons";

const NavBar = () => {
  return (
    <nav className="w-full font-macondo bg-white/30 border-2 border-white/40 backdrop-blur-md h-16 rounded-2xl mt-2 mx-2 text-white navigation flex flex-row justify-between items-center px-2">
      <img src={logo} alt="" className="w-15 aspect-square " />
      <div className="menu font-bold text-lg flex flex-row gap-2">
        <Link to="/app">
          <Buttons value="Go to app" color="blue" />
        </Link>
        <Link to="/login">
          <Buttons value="Login" color="yellow" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
