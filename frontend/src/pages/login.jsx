/* eslint-disable no-unused-vars */
import React from "react";
import "../css/SignUp.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
    
       email: "",
     password: "",
   });
   const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        formData
      );

      const backendMsg = response.data.message;
      if (backendMsg === "Login Successful!") {
        setMessage(backendMsg);
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user));
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
        <h2>Login</h2>

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
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
