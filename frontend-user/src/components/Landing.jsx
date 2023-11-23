import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
    </>
  );
};
export default Landing;
