import express, { request, response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "../models/newUser.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
const jwtToken = process.env.JWT_SECRET;
const mongodbURI = process.env.mongodbURI;
const PORT = process.env.PORT || 3000;

// * LANDING ROUTE
app.get("/api/landing", (request, response) => {
  response.json({ message: "landed safely!1" });
});

// ! MONGODB CONNECTION
mongoose
  .connect(mongodbURI)
  .then(() => console.log("Mongodb connected!"))
  .catch((error) => console.log(error));

//! SIGN UP ROUTE
app.post("/api/signup", async (request, response) => {
  try {
    const { fullname, username, email, password } = request.body;
    if (!fullname || !username || !email || !password) {
      return response
        .status(400)
        .send({ message: "Plese provide all required fields" });
    }
    //* Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return response.status(400).send({ message: "User already exists!" });
    }

    //* Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //* Save new user
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    response
      .status(201)
      .send({ message: "New User Created!", user: { fullname } });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//! LOGIN ROUTE
app.post("/api/login", async (request, response) => {
  const { email, password } = request.body;
  try {
    // * Make sure all fields are filled
    if (!email || !password) {
      return response.status(400).send({ message: "Please fill all fields!" });
    }
    // * find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).send({ message: "User not found!" });
    }

    //* Comparing passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(400).send({ message: "Invalid credentials" });
    }
    //* Generate JWT token
    const token = jwt.sign(
      { userId: user._id, fullname: user.fullname },
      jwtToken,
      { expiresIn: "1h" }
    );

    //* send the token and user data back in the response
    response.status(200).send({
      message: "Login Successful!",
      token,
      user: { fullname: user.fullname, email: user.email },
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`);
});
