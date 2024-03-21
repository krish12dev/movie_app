const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/login");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

require("./routes/movies.routes")(app);
async function main() {
  try {
    // need to put in .env
    const db = await mongoose.connect("mongodb+srv://krishnadev9360:4rImExiIySFue1lq@movie-cluster.o1gehho.mongodb.net/");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

main().catch((err) => console.error(err));

const jwt = require("jsonwebtoken");
const movieSchema = require("./model/movie");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (password === user.password) {
        // Create JWT token
        const token = jwt.sign({ user: delete user.password }, "Abhishek", {
          expiresIn: "1h",
        });

        res
          .status(200)
          .json({ message: "Login successful", token: token,role:user?.role, success: true });
      } else {
        res
          .status(401)
          .json({ message: "email & Password does not match", success: false });
      }
    } else {
      res.status(401).json({ message: "User not registered", success: false });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, password ,role} = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res
        .status(409)
        .json({ message: "User already registered", success: false });
    } else {
      const newUser = new User({ name: username, email, password ,role});
      await newUser.save();
      res.status(200).json({
        message: "Successfully registered. Please login now.",
        success: true,
      });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: "Internal server error" });
  }
});
app.listen(port, () => {
  console.log("Server is running on port", port);
});
