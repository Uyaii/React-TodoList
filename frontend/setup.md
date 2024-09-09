First of all create your backend and frontend folders, then in your backend folder create a .env and .gitignore file and then add ".env" to your .gitignore file so that when you upload it to github you wont expose intricate information

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
 now to make everything more secure move your mogodb url to your .env file

 ```.env
 mongodbURI = "NDKNKNQIIQNQN"
 ```
  to reference it in your project first install dotenv package with npm
  ```bash
  npm install dotenv
  ```

  nnow import it in your folder, initialize it then reference your mongodb url
  ```js
  import dotenv frfom "dotenv"

  dotenv.config()

  const mongodbURI = process.env.mongodbURI
  ```

## SIGN UP 
### backend
Now we create a models folder that will hold our model schemas for our users/new users and in that folder we create a User.mjs file and add our schema

```js
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;

```

After creating the model we set u the route in our backend 

```js
import bcrypt from "bcrypt";
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

```

In the above code we hashed the password and we used the bcrypt package to do it so first install it, import it then you can appply it to your peoject


 ### frontend
Now we're dont setting up the backend we move to the frontend

```js
/* eslint-disable no-unused-vars */
import React from "react";
import "../css/SignUp.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  //const [user, setUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        formData
      );

      const backendMsg = response.data.message;
      if (backendMsg === "New User Created!") {
        setMessage(backendMsg);
        localStorage.setItem("user", JSON.stringify(response.data.user))
        console.log(backendMsg);
        navigate("/home");
      } else {
        setMessage(backendMsg);
        console.log(backendMsg);
      }
      //* If successful
    } catch (error) {
      console.error("Error signing up:", error);

      // Check if there's a response from the server
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message); // Display the server's error message
      } else {
        setMessage("An unexpected error occurred."); // Generic fallback message
      }
    }
  };

  // * Timeout to clear the message after 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000); // 2 seconds

      return () => clearTimeout(timer); // Clean up the timer on component unmount or when the message changes
    }
  }, [message]);


  return (
    <>
      {message && <div className="message">{message}</div>}
     
      <form className="form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;

```



## LOGIN
### backend
The login will be almost identical to the signup thw only difference is we're validating user input to determine if the user will be allowed to login or not

In this part we used a jwt token to help with authentication so we installed the jsonwebtoken package and import it

we also create a jwt secret key in our .env file to use in the project 
```js
import jwt from "jsonwebtoken";
const jwtToken = process.env.JWT_SECRET;
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
```


