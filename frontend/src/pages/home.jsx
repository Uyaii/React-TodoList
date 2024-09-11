/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TasksList from "../components/tasksList";
import "../css/home.css";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import TaskModal from "../components/taskModal";
import EditTaskModal from "../components/editTaskModal";
import LogoutBtn from "../components/logoutBtn";
import Tooltip from "@mui/material/Tooltip";

const Home = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
  });
  //const [editModal, setEditModal] = useState(false);
  const [isErrorMsg, setIsErrorMsg] = useState(false);
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
      console.log(response);
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
      console.log(backendMsg);
      if (backendMsg === "New Task Created!") {
        setMessage(backendMsg);
        setIsErrorMsg(false);
        setAddForm({ title: "", description: "" }); // Reset the form
        await fetchTasks(); // Fetch tasks again to update the list
        setShowModal(false); // Close the modal
        //console.log(message);
      } else if (backendMsg === "Duplicate task!") {
        setMessage(backendMsg);
        console.log(backendMsg);

        setAddForm({ title: "", description: "" });
      } else {
        setMessage(backendMsg);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      setIsErrorMsg(true);

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
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 1000); // 1 second

      return () => clearTimeout(timer); // Clean up the timer on component unmount or when the message changes
    }
  }, [message]);

  // * Edit logic
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
  });
  const [editTaskId, setEditTaskId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const triggerEditModal = (task) => {
    setShowEditModal(!showEditModal);
    setEditForm({ title: task.title, description: task.description });
    setEditTaskId(task._id);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/task/${editTaskId}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const backendMsg = response.data.message;
      if (backendMsg === "Task Updated Successfully!") {
        setIsErrorMsg(false);
        setMessage(backendMsg);
        setEditForm({
          title: "",
          description: "",
        });
        await fetchTasks();
        setShowEditModal(false);
      }
    } catch (error) {
      setIsErrorMsg(true);
      console.error("error updating task:", error);
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
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Updating ${name} with value ${value}`);
    setEditForm({ ...editForm, [name]: value });
  };
  return (
    <>
      {user ? (
        <>
          <header>
            <h1>Welcome, {user.username}!</h1>
            <LogoutBtn />
          </header>
          <div className="task-container">
            <form className="searchForm">
              <input type="text" placeholder="Search Tasks" />
              <Tooltip title="Search Tasks">
                <button>
                  <BsFillSearchHeartFill />
                </button>
              </Tooltip>
            </form>
            <Tooltip title="Add New Task">
              <button onClick={triggerModal} className="addTaskBtn">
                <CgAdd />
              </button>
            </Tooltip>
            <TaskModal
              showModal={showModal}
              setShowModal={setShowModal}
              triggerModal={triggerModal}
              addForm={addForm}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              message={message}
              setMessage={setMessage}
              isErrorMsg={isErrorMsg}
              setIsErrorMsg={setIsErrorMsg}
            />
            <EditTaskModal
              showEditModal={showEditModal}
              triggerEditModal={triggerEditModal}
              editForm={editForm}
              handleEditChange={handleEditChange}
              handleEditSubmit={handleEditSubmit}
              message={message}
              setMessage={setMessage}
              isErrorMsg={isErrorMsg}
              setIsErrorMsg={setIsErrorMsg}
            />
            {tasks && (
              <>
                {tasks.length > 0 ? (
                  <>
                    <h3>Here are your tasks:</h3>
                    <>
                      {message && (
                        <>
                          {!isErrorMsg ? (
                            <div className="message task">{message}</div>
                          ) : null}
                        </>
                      )}
                    </>

                    <TasksList
                      tasks={tasks}
                      fetchTasks={fetchTasks}
                      showModal={showModal}
                      setShowModal={setShowModal}
                      triggerModal={triggerModal}
                      message={message}
                      setMessage={setMessage}
                      triggerEditModal={triggerEditModal}
                      setTasks={setTasks}
                    />
                  </>
                ) : (
                  <p>No tasks yet </p>
                )}
              </>
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
