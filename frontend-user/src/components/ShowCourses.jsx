import React, { useState, useEffect, useContext } from "react";
import LoginDataContext from "./LoginDataContext";
import { useNavigate } from "react-router-dom";
import CourseDetails from "./CourseDetails";
const ShowCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const { token } = useContext(LoginDataContext);

  console.log("token: ", token);
  //get all courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",

        "Authorization": `Bearer ${token}`,
      };
      const response = await fetch("http://localhost:3000/users/courses", {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) throw new Error(`HTTP Error status ${response.status}`);
      const responseData = await response.json();
      console.log(responseData);
      setCourses(responseData.courses);
    } catch (error) {
      console.log(error);
    }
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
