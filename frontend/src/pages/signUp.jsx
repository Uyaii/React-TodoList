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
