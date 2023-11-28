const express = require("express");
const { User, Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");

const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();
/*POST /users/signup
   Description: Creates a new user account.
   Input: { username: 'user', password: 'pass' }
   Output: { message: 'User created successfully', token: 'jwt_token_here' }*/

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});
/* POST /users/login
   Description: Authenticates a user. It requires the user to send username and password in the headers.
   Input: Headers: { 'username': 'user', 'password': 'pass' }
   Output: { message: 'Logged in successfully', token: 'jwt_token_here' }*/

router.post("/login", async (req, res) => {
  const { username, password } = req.body.headers;

  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in Sccessfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});
/*GET /users/courses
   Description: Lists all the courses.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }*/
router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});
/*GET /users/courses/:courseId
   Description: Lists all the courses.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output:  { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }*/
router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  res.json({ course });
});
/*POST /users/courses/:courseId
   Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { message: 'Course purchased successfully' }*/
router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfuly" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

/*GET /users/purchasedCourses
   Description: Lists all the courses purchased by the user.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }*/
router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});
module.exports = router;
