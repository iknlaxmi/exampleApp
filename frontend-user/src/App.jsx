import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import ShowCourses from "./components/ShowCourses";
import ShowPurchasedCourses from "./components/ShowPurchasedCourses";
import LoginDataContext from "./components/LoginDataContext";
import "./App.css";
import CourseDetails from "./components/CourseDetails";

function App() {
  const [token, setToken] = useState("");
  return (
    <LoginDataContext.Provider value={{ token, setToken }}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<ShowCourses />} />
          <Route path="/courses/purchased" element={<ShowPurchasedCourses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
        </Routes>
      </Router>
    </LoginDataContext.Provider>
  );
}

export default App;
