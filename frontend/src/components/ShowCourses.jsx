import React, { useEffect } from "react";
import axios from "axios";

function ShowCourses({ token, courseAdded }) {
  const [courses, setCourses] = React.useState([]);

  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  useEffect(() => {
    fetchCourses();
  }, [courseAdded]);
  const fetchCourses = () => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
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
      <h1>Courses:</h1>
      {courses.map((c) => (
        <Course key={c._id} title={c.title} />
      ))}
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
