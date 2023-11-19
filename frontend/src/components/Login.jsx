import React, { useState } from "react";
import CreateCourse from "./CreateCourse";
import axios from "axios";
import ShowCourses from "./ShowCourses";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [isCourseAdded, setIsCourseAdded] = useState(false);

  const handleCourseAdded = (data) => {
    setIsCourseAdded(data);
  };
  const handleLogout = () => {
    localStorage.removeItem(email);
    setIsLoginSuccess(false);
  };
  const handleLogin = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",

        "username": email,
        "password": password,
      };

      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error status:${response.status}`);
      }
      const responseData = await response.json();
      setIsLoginSuccess(true);
      setToken(responseData.token);
      console.log(responseData);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }

      console.error("Error config:", error.config);
    }
  };

  return (
    <div>
      {!isLoginSuccess ? (
        <div>
          <h1>Login to admin dashboard</h1>
          <br />
          Email -{" "}
          <input type={"text"} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <br />
          Password -{" "}
          <input type={"text"} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button onClick={handleLogin}>Login</button>
          <br />
          New here? <a href="/register">Register</a>
        </div>
      ) : (
        <div>
          <CreateCourse token={token} handleCourseAdded={handleCourseAdded} />
          <ShowCourses token={token} courseAdded={isCourseAdded} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Login;
