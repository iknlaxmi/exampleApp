import { useContext, useState, useEffect } from "react";
import LoginDataContext from "./LoginDataContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
const ShowPurchasedCourses = () => {
  const location = useLocation();
  const { email } = location.state;
  const [purchasedCourses, setPurchasedCourses] = useState([]);
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
      .get("http://localhost:3000/users/purchasedCourses", {
        headers: headers,
      })
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);
        setPurchasedCourses(responseData.purchasedCourses);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h1>Purchased Courses</h1>
      {purchasedCourses.map((course) => {
        return <h3 key={course._id}>{course.title}</h3>;
      })}
    </>
  );
};
export default ShowPurchasedCourses;
