After doing the usual set up you integrate both your frontend and backend

```js
//backend
import express, { request, response } from "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// * LANDING ROUTE
app.get("/api/landing", (request, response) => {
  response.json({ message: "landed safely!1" });
  //   response.status(200).send("Landed safely!2");
});

app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`);
});

//frontend

/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/landing").then((response) => {
      console.log(response);

      setMessage(response.data.message).catch((error) => {
        console.error("there was an error", error);
      });
    });
  }, []);
  return (
    <div>
      <h1>Todoly</h1>
      <p>message from backend: {message}</p>

      <p>
        Organize Your Day, Conquer Your Goals: Your Ultimate Productivity Hub
        Starts Here!
      </p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default LandingPage;
```

now for proper integrattion install cors in your backend

```bash
npm install cors

```

then you import it in your express app

```js
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
```
 now install mongodb, mongoose for database in your backend 
 Set up your mongodb connection and make sure you're connected

 ```js
 // ! MONGODB CONNECTION
mongoose
  .connect(
    "mongodb+srv://maryanneinyang:ndifreke_12383@cluster0.ubrui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Mongodb connected!"))
  .catch((error) => console.log(error));

 ```


```js
import express, { request, response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "../models/newUser.mjs";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());
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

    response.status(201).send({ message: "New User Created!" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`);
});

```
