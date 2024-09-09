/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TasksList from "../components/tasksList";
import "../css/home.css";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import TaskModal from "../components/taskModal";

const Home = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  //*  getting username
  useEffect(() => {
    // Get user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  //* Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }, //send token to the header
      };
      const response = await axios.get(
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

  //* Show add Task Modal
  const triggerModal = () => {
    setShowModal(!showModal);
  };

  // * Add task logic

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Updating ${name} with value ${value}`);
    setAddForm({ ...addForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/addtask", // Correct API endpoint for adding tasks
        addForm,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Include token in request header
        }
      );

      const backendMsg = response.data.message;
      if (backendMsg === "New Task Created!") {
        setMessage(backendMsg);
        setAddForm({ title: "", description: "" }); // Reset the form
        await fetchTasks(); // Fetch tasks again to update the list
        setShowModal(false); // Close the modal
        console.log(message);
      } else {
        setMessage(backendMsg);
      }
    } catch (error) {
      console.error("Error adding task:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

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

            <button className="addTaskBtn" onClick={triggerModal}>
              Add Task <CgAdd />
            </button>
            <TaskModal
              showModal={showModal}
              setShowModal={setShowModal}
              triggerModal={triggerModal}
              addForm={addForm}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
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
