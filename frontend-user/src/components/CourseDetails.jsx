import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoginDataContext from "./LoginDataContext";
import axios from "axios";
const CourseDetails = () => {
  const params = useParams();

  const { token } = useContext(LoginDataContext);
  const [course, setCourse] = useState([]);

  //get all courses
  useEffect(() => {
    fetchCourses();
  }, []);

  // useEffect(() => {
  //   // setId(params.id);
  //   const courseData = courses.find((course) => course._id === params.id);
  //   console.log(courseData, params.id);
  //   setSingleCourse(courseData);
  // }, [params]);

  const fetchCourses = () => {
    const headers = {
      "Content-Type": "application/json",

      "Authorization": `Bearer ${token}`,
    };
    axios
      .get(`http://localhost:3000/users/courses/${params.id}`, {
        headers: headers,
      })
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);
        setCourse(responseData.course);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePurchase = () => {
    const headers = {
      "Content-Type": "application/json",

      "Authorization": `Bearer ${token}`,
    };
    axios
      .post(`http://localhost:3000/users/courses/${params.id}`, {
        headers: headers,
      })
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h3>{course.title}</h3>
      <h3>{course.description}</h3>
      <h3>{course.price}</h3>
      <h3>{course.imageLink}</h3>
      <h3>{course.published}</h3>
      <button onClick={handlePurchase}>Purchase</button>
    </>
  );
};

export default CourseDetails;
