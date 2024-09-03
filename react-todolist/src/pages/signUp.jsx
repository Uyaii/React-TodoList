/* eslint-disable no-unused-vars */
import React from "react";
import "../css/SignUp.css";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        formData
      );
    } catch (error) {
      console.error("error signing up:", error);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label htmlFor="">Full Name</label>
      <input type="text" value={formData.fullname} onChange={handleChange} />

      <label htmlFor="">Username</label>
      <input type="text" value={formData.username} onChange={handleChange} />

      <label htmlFor="">Email Address</label>
      <input type="email" value={formData.email} onChange={handleChange} />

      <label htmlFor="">Password</label>
      <input
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
