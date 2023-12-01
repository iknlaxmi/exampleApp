import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CourseCard from "./CourseCard";
import NavBarAfterLogin from "./NavBarAfterLogin";

function ShowCourses() {
  const [courses, setCourses] = React.useState([]);
  const location = useLocation();

  // const email = location.state;
  console.log(typeof location.state);
  let email;
  if (typeof location.state === "object") {
    email = location.state.email;
  } else {
    email = location.state;
  }
  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchCourses = () => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(email)}`,
    };
    axios
      .get("http://localhost:3000/admin/courses", {
        headers: headers,
      })
      .then((response) => {
        const responseData = response.data;
        setCourses([...responseData]);
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {/* <CourseCard /> */}
      <NavBarAfterLogin email={email} />
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
}

function Course(props) {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
}

export default ShowCourses;
