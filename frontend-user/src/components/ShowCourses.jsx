import React, { useState, useEffect, useContext } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import CourseDetails from "./CourseDetails";

import NavBarLogin from "../components/NavBarLogin";
import axios from "axios";
import CourseCard from "../components/CourseCard";
const ShowCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const location = useLocation();

  // const email = location.state;
  console.log(typeof location.state);
  let email;
  if (typeof location.state === "object") {
    email = location.state.email;
  } else {
    email = location.state;
  }

  //get all courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    const headers = {
      "Content-Type": "application/json",

      "Authorization": `Bearer ${localStorage.getItem(email)}`,
    };
    axios
      .get("http://localhost:3000/users/courses", {
        headers: headers,
      })
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);
        setCourses(responseData.courses);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //show single course page
  const handleSingleCourse = (id) => {
    navigate(`/courses/${id}`);
  };
  return (
    <div>
      {/* <CourseCard /> */}
      <NavBarLogin email={email} />
      <h1 className="m-4 text-center p-4 block  text-2xl antialiased font-semibold leading-tight tracking-normal text-inherit">
        LATEST COURSES
      </h1>
      <div className="sm:flex sm:flex-row sm:flex-wrap">
        {courses.map((c) => (
          <CourseCard course={c} email={email} />
        ))}
      </div>
    </div>
  );
};
export default ShowCourses;
