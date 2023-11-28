import React, { useState, useEffect, useContext } from "react";
import LoginDataContext from "./LoginDataContext";
import { useNavigate } from "react-router-dom";
import CourseDetails from "./CourseDetails";
import axios from "axios";
const ShowCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const { token } = useContext(LoginDataContext);

  console.log("token: ", token);
  //get all courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    const headers = {
      "Content-Type": "application/json",

      "Authorization": `Bearer ${token}`,
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
    <>
      <h1>All Courses</h1>
      {courses.map((course) => {
        return (
          <li key={course._id} onClick={() => handleSingleCourse(course._id)}>
            {course.title}
          </li>
        );
      })}
    </>
  );
};
export default ShowCourses;
