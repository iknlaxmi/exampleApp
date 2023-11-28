import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        "http://localhost:3000/users/signup",
        { username: email, password: password },
        {
          headers: headers,
        }
      )
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);
        localStorage.setItem(email, responseData.token);
      })
      .catch((error) => {
        console.error("POST ERROR", error);
      });
  };

  return (
    <>
      <br />
      Email - <input type={"text"} onChange={(e) => setEmail(e.target.value)} />
      <br />
      Password -{" "}
      <input type={"text"} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      Already a User? <Link to="/login">Login</Link>
    </>
  );
};
export default Register;
