/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   axios.get("http://localhost:3000/api/landing").then((response) => {
  //     console.log(response);

  //     setMessage(response.data.message).catch((error) => {
  //       console.error("there was an error", error);
  //     });
  //   });
  // }, []);
  return (
    <div>
      <h1>Todoly</h1>
      {/* <p>message from backend: {message}</p> */}

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
