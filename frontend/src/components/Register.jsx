import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <h1>Register to the website</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <br />
        <input type={"text"} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type={"text"} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Submit</button>
      </form>
      Already a user? <a href="/login">Login</a>
    </div>
  );
}

export default Register;
