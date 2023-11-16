const express = require("express");
const app = express();
const PORT = 3000;
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(express.json());

// Storing data in files

/**
 * POST /admin/signup
   Description: Creates a new admin account.
   Input: { username: 'admin', password: 'pass' }
   Output: { message: 'Admin created successfully', token: 'jwt_token_here' }
 */
const secretKey = "pingpong";
const generateJwt = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post("/admin/signup", (req, res) => {
  const new_admin = {
    id: Math.floor(Math.random() * 1000000),
    username: req.body.username,
    password: req.body.password,
  };
  const jwt_token = generateJwt(new_admin);
  fs.readFile("files/admin.json", "utf-8", (err, data) => {
    if (err) throw err;
    const admins = JSON.parse(data);
    admins.push(new_admin);
    fs.writeFile("files/admin.json", JSON.stringify(admins), (err) => {
      if (err) throw err;
      res.send({
        message: "Admin created successfully",
        token: jwt_token,
      });
    });
  });
});
/***
 * POST /admin/login
   Description: Authenticates an admin. It requires the admin to send username and password in the headers.
   Input: Headers: { 'username': 'admin', 'password': 'pass' }
   Output: { message: 'Logged in successfully', token: 'jwt_token_here' }
 */
app.post("/admin/login", (req, res) => {
  fs.readFile("files/admin.json", "utf-8", (err, data) => {
    if (err) throw err;
    const admins = JSON.parse(data);

    const admin = admins.find(
      (admin) =>
        admin.username === req.body.username &&
        admin.password === req.body.password
    );
    const jwt_token = generateJwt(admin);
    if (admin) {
      res.send({
        message: "Logged in successfully",
        token: jwt_token,
      });
    }
  });
});

/***
 * POST /admin/courses
   Description: Creates a new course.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }
   Output: { message: 'Course created successfully', courseId: 1 }
 */
app.post("/admin/courses", authenticateJwt, (req, res) => {
  // const new_course = {
  //   id: Math.floor(Math.random() * 1000000),
  //   title: req.body.title,
  //   description: req.body.description,
  //   price: req.body.price,
  //   imageLink: req.body.imageLink,
  //   published: req.body.published,
  // };

  const new_course = req.body;
  new_course.id = Math.floor(Math.random() * 1000000);

  fs.readFile("files/course.json", "utf-8", (err, data) => {
    if (err) throw err;
    const courses = JSON.parse(data);

    courses.push(new_course);

    fs.writeFile("files/course.json", JSON.stringify(courses), (err) => {
      if (err) throw err;
      res.send({
        message: "Course created successfully",
        courseId: new_course.id,
      });
    });
  });
});

/***
 * PUT /admin/courses/:courseId
   Description: Edits an existing course. courseId in the URL path should be replaced with the ID of the course to be edited.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'updated course title', description: 'updated course description', price: 100, imageLink: 'https://updatedlinktoimage.com', published: false }
   Output: { message: 'Course updated successfully' }
 */

app.put("/admin/courses/:courseId", authenticateJwt, (req, res) => {
  const update_courseId = parseInt(req.params.courseId);

  fs.readFile("files/course.json", "utf-8", (err, data) => {
    if (err) throw err;
    const courses = JSON.parse(data);
    // const course = courses.find((course) => course.id === update_courseId);
    //if (course) {
    //   course.title = req.body.title;
    //   course.description = req.body.description;
    //   course.price = req.body.price;
    //   course.imageLink = req.body.imageLink;
    //   course.published = req.body.published;
    const courseIndex = courses.findIndex((c) => c.id === update_courseId);
    if (courseIndex > -1) {
      const updatedCourse = { ...courses[courseIndex], ...req.body };
      courses[courseIndex] = updatedCourse;

      fs.writeFile("files/course.json", JSON.stringify(courses), (err) => {
        if (err) throw err;
        res.send({ message: "Course updated successfully" });
      });
    } else {
      res.status(404).send("Course not found");
    }
  });
});

/**
    * GET /admin/courses
   Description: Returns all the courses.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
    */

app.get("/admin/courses", authenticateJwt, (req, res) => {
  fs.readFile("files/course.json", "utf-8", (err, data) => {
    if (err) throw err;
    const courses = JSON.parse(data);
    res.send(courses);
  });
});
/*POST /users/signup
   Description: Creates a new user account.
   Input: { username: 'user', password: 'pass' }
   Output: { message: 'User created successfully', token: 'jwt_token_here' }*/

app.post("/users/signup", (req, res) => {
  const new_user = {
    id: Math.floor(Math.random() * 1000000),
    username: req.body.username,
    password: req.body.password,
  };
  fs.readFile("files/user.json", "utf-8", (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);
    const duplicate_user = users.find(
      (user) =>
        user.username === req.body.username &&
        user.password === req.body.password
    );
    if (!duplicate_user) {
      users.push(new_user);
      fs.writeFile("files/user.json", JSON.stringify(users), (err) => {
        if (err) throw err;

        const jwt_token = generateJwt(new_user);
        res.send({ message: "User created successfully", token: jwt_token });
      });
    } else {
      res.send({ message: "user already exist" });
    }
  });
});
/* POST /users/login
   Description: Authenticates a user. It requires the user to send username and password in the headers.
   Input: Headers: { 'username': 'user', 'password': 'pass' }
   Output: { message: 'Logged in successfully', token: 'jwt_token_here' }*/

app.post("/users/login", (req, res) => {
  fs.readFile("files/user.json", "utf-8", (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);
    const user = users.find(
      (user) =>
        user.username === req.headers.username &&
        user.password === req.headers.password
    );
    const jwt_token = generateJwt(user);
    if (user) {
      res.send({
        message: "Logged in successfully",
        token: jwt_token,
      });
    } else {
      res.status(404).send("User not found");
    }
  });
});
/*GET /users/courses
   Description: Lists all the courses.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }*/
app.get("/users/courses", authenticateJwt, (req, res) => {
  fs.readFile("files/course.json", "utf-8", (err, data) => {
    if (err) throw err;
    const courses = JSON.parse(data);
    res.send(courses);
  });
});
/*POST /users/courses/:courseId
   Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { message: 'Course purchased successfully' }*/
app.post("/users/courses/:courseId", authenticateJwt, (req, res) => {
  const purchase_id = parseInt(req.params.courseId);
  fs.readFile("files/course.json", "utf-8", (err, data) => {
    if (err) throw err;
    const courses = JSON.parse(data);
    const course_purchased = courses.find(
      (course) => course.id === purchase_id
    );
    if (course_purchased) {
      fs.readFile("files/user.json", "utf-8", (err, data) => {
        if (err) throw err;
        const users = JSON.parse(data);
        const user = users.find((u) => u.username === req.user.username);
        if (user) {
          if (!user.purchasedCourses) {
            user.purchasedCourses = [];
          }
          user.purchasedCourses.push(course_purchased);
          fs.writeFile("files/user.json", JSON.stringify(users), (err) => {
            if (err) throw err;
            res.send({ message: "Course purchased successfully" });
          });
        } else {
          res.status(403).send({ message: "User not found" });
        }
      });
    } else {
      res.status(404).send({ message: "Course not found" });
    }
  });
});

/*GET /users/purchasedCourses
   Description: Lists all the courses purchased by the user.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }*/
app.get("/users/purchasedCourses", authenticateJwt, (req, res) => {
  fs.readFile("files/user.json", "utf-8", (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);
    const user = users.find((u) => u.username === req.user.username);
    if (user && user.purchasedCourses) {
      res.json({ purchasedCourses: user.purchasedCourses });
    } else {
      res.status(404).json({ message: "No courses purchased" });
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
