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
 now install mongodb for database in your backend 
 