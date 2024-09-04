/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axois from "axios";
import { useNavigate } from "react-router-dom";
import TasksList from "../components/tasksList";
import "../css/home.css";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";

const Home = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //*  getting username
  useEffect(() => {
    // Get user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  //* Fetch tasks from teh server
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }, //send token to the header
      };
      const response = await axois.get(
        "http://localhost:3000/api/tasks",
        config
      );
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message); // Display server's error message
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    //* check if the user is logged in (token exists)
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks(); //fetch tasks if authenticated
    }
  }, [navigate]);
  return (
    <>
      {user ? (
        <>
          <header>
            <h1>Welcome, {user.username}!</h1>
          </header>
          <div className="task-container">
            <form className="searchForm">
              <input type="text" placeholder="Search Tasks" />
              <button>
                <BsFillSearchHeartFill />
              </button>
            </form>

            <button className="addTaskBtn">
              Add Task <CgAdd />
            </button>

            {tasks ? (
              <>
                {tasks.length > 0 && (
                  <>
                    <h3>Here are your tasks:</h3>
                    <TasksList tasks={tasks} />
                  </>
                )}
              </>
            ) : (
              <p>No tasks yet </p>
            )}
          </div>
        </>
      ) : (
        <h1>You&apos;re not supposed to be here !</h1>
      )}
    </>
  );
};

export default Home;
