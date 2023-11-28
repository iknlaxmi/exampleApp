import React from "react";
import logo from "../assets/logo.svg";

import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div>
      <div className="flex mx-10 my-10 space-x-4 gap-x-10">
        <div className="grow  rounded-md text-white text-center">
          <img className="w-21 h-28" src={logo} />
        </div>
        <div className="bg-blue-600 w-28 h-12 rounded-md text-white flex-none text-center px-3 py-3 mx-4 my-4">
          <Link className="" to="/register">
            Register
          </Link>
        </div>
        <div className="bg-blue-600 w-28 h-12 rounded-md text-white flex-none text-center px-3 py-3 mx-4 my-4">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
