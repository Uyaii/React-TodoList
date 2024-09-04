import express, { request, response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "../models/newUser.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()
const jwtToken = process.env.JWT
const PORT = process.env.PORT || 3000;

// * LANDING ROUTE
app.get("/api/landing", (request, response) => {
  response.json({ message: "landed safely!1" });
});

// ! MONGODB CONNECTION
mongoose
  .connect(
    "mongodb+srv://maryanneinyang:ndifreke_12383@cluster0.ubrui.mongodb.net/Users?retryWrites=true&w=majority&appName=Cluster0"
  )
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
app.get("/api/login/", async (response, request) => {
  try {
    const { email, password } = request.body;

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
    const isMatch = await bcrypt.compare(password, user.password)
  } catch (error) {}
});
app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`);
});
