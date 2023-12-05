import React from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/login-image.jpg";
import NavBar from "../components/NavBar";
const Landing = () => {
  return (
    <>
      <NavBar />
      <div className="mx-10 my-10">
        <img className="w-full h-auto" src={loginImage} />
      </div>
    </>
  );
};
export default Landing;
