const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();
const PORT = 3000;

app.use(cors());
const bodyParser = require("body-parser");

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => res.json({ msg: "hello world" }));
//connect to mongodb
mongoose.connect(
  "mongodb+srv://laxmimit:pingpong@cluster0.b31uole.mongodb.net/courses",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" }
);
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
