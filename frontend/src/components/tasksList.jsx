/* eslint-disable react/jsx-key */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState } from "react";
import TaskItem from "./taskItem";

const TasksList = ({
  tasks,
  fetchTasks,
  showModal,
  setShowModal,
  triggerModal,
  message,
  setMessage,
  triggerEditModal,
  setTasks,
}) => {
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.delete(`http://localhost:3000/api/task/${id}`, config);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };
 //tasks.map((task) => return task)

  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          triggerEditModal={triggerEditModal}
          handleDelete={handleDelete}
          fetchTasks={fetchTasks}
        />
      ))}
    </ul>
  );
};
export default TasksList;
