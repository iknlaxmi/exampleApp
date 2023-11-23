import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ username: email, password: password }),
      });
      const responseData = await response.json();
      console.log(responseData);
      localStorage.setItem(email, responseData.token);
    } catch (error) {
      console.error("POST ERROR", error);
    }
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
