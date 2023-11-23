import { useContext, useState, useEffect } from "react";
import LoginDataContext from "./LoginDataContext";
const ShowPurchasedCourses = () => {
  const { token } = useContext(LoginDataContext);
  console.log("token:", token);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
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
      const response = await fetch(
        "http://localhost:3000/users/purchasedCourses",
        {
          method: "GET",
          headers: headers,
        }
      );
      if (!response.ok) throw new Error(`HTTP Error status ${response.status}`);
      const responseData = await response.json();
      console.log(responseData);
      setPurchasedCourses(responseData.purchasedCourses);
    } catch (error) {
      console.log(error);
    }
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
