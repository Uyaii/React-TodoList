/* eslint-disable no-unused-vars */
import React from 'react'

const Login = () => {
  const handleSubmit = () => { }; 
  const handleChange = () => { }; 
  const formData=[]
  return (
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
  );
}

export default Login
