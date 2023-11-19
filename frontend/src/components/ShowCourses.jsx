import React, { useEffect } from "react";

function ShowCourses({ token, courseAdded }) {
  const [courses, setCourses] = React.useState([]);

  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  useEffect(() => {
    fetchCourses();
  }, [courseAdded]);
  const fetchCourses = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      const response = await fetch("http://localhost:3000/admin/courses", {
        method: "GET",
        headers: headers,
      });

      const responseData = await response.json();
      setCourses([...responseData]);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
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
