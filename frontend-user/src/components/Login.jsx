import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ShowCourses from "./ShowCourses";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoginDataContext from "./LoginDataContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const temp = "HELLO";
  const [password, setPassword] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const { token, setToken } = useContext(LoginDataContext);
  const [loading, setLoading] = useState(true);

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showPurchasedCourses, setShowPurchasedCourses] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const headers = {
      "Content-Type": "application/json",

      "username": email,
      "password": password,
    };

    axios
      .post("http://localhost:3000/users/login", {
        headers: headers,
      })
      .then((response) => {
        const responseData = response.data;
        setIsLoginSuccess(true);
        setToken(responseData.token);
        localStorage.setItem(email, responseData.token);
        setLoading(true);
        console.log(response);
      })
      .catch((error) => {
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
      });
  };

  const handleShowAllCouses = () => {
    navigate("/courses");
    setShowAllCourses(true);
  };
  const handleShowPurchasedCouses = () => {
    navigate("/courses/purchased");
    setShowPurchasedCourses(true);
  };

  return (
    <>
      {!isLoginSuccess ? (
        <div>
          <h1>Login to User Dashboard</h1>
          <br />
          <input type={"text"} onChange={(e) => setEmail(e.target.value)} />
          <input type={"text"} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Submit</button>
          <br />
          New here? <Link to="/Register">Register</Link>
        </div>
      ) : (
        <div>
          <button onClick={handleShowAllCouses}>Show All Courses</button>
          <button onClick={handleShowPurchasedCouses}>
            Show Purchased Courses
          </button>
          {/* {showAllCourses && !loading && <ShowCourses coursesData={courses} />} */}
        </div>
      )}
    </>
  );
};
export default Login;
