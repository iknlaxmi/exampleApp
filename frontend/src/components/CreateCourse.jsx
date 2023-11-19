import React from "react";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse({ token, handleCourseAdded }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [imageLink, setImageLink] = React.useState("");
  const [published, setPublished] = React.useState(false);
  const [isCourseAdded, setIsCourseAdded] = React.useState(false);

  const handleCreateCourseButton = async () => {
    const new_course = {
      title: title,
      description: description,
      price: price,
      imageLink: imageLink,
      published: published,
    };
    try {
      const headers = {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token}`,
      };
      const response = await fetch(
        "http://localhost:3000/admin/courses",

        { method: "POST", headers: headers, body: JSON.stringify(new_course) }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error status:${response.status}`);
      }
      const responseData = await response.json();
      handleCourseAdded(true);
      console.log(responseData);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }

      console.error("Error config:", error.config);
    }
  };

  return (
    <div>
      <h1>Create Course Page</h1>
      <input
        type={"text"}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
      />
      <input
        type={"text"}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
      />
      <input
        type={"text"}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
      />
      <input
        type={"text"}
        onChange={(e) => setImageLink(e.target.value)}
        placeholder="image link"
      />
      <input
        type={"text"}
        onChange={(e) => setPublished(e.target.value)}
        placeholder="published"
      />
      <button onClick={handleCreateCourseButton}>Create Course</button>
    </div>
  );
}
export default CreateCourse;
