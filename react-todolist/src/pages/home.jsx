/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.fullname}!</h1>
      ) : (
        <h1>Welcome to the Home Page!</h1>
      )}
    </div>
  );
};

export default Home;
