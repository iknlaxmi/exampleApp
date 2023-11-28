import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/admin/signup", {
        username: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem(email, response.data.token);
      })
      .catch((error) => {
        console.error("POST ERROR", error);
      });
  };

  return (
    <div>
      <NavBar />

      <div className="h-screen w-full flex justify-center items-center">
        <h1>Register to the website</h1>
        <div className="flex border-blue-400 rounded border-2 w-96 h-96">
          <div>
            {" "}
            <input
              className="border-2"
              type={"text"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <input
              className="border-2"
              type={"text"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <button onClick={handleSubmit}>Submit</button>
          </div>
          Already a user? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
