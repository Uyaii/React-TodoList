/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
const TaskItem = ({ task, triggerEditModal, handleDelete, fetchTasks }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  //const [isVisible, setIsVisible] = useState(true);

  const handleCompleted = async () => {
    try {
      setIsCompleted(true);
      await axios.put(
        `http://localhost:3000/api/task/${task._id}`,
        {
          title: task.title,
          description: task.description,
          completed: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await fetchTasks();
      setTimeout(() => {
        handleDelete(task._id);
      }, 1500);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  //   useEffect(() => {
  //     if (task.completed) {
  //     }
  //   }, [isCompleted]);

  return (
    <li>
      <h3>{task.title}</h3>
      <p>Todo: {task.description}</p>

      <p>Status: {isCompleted ? "Completed" : "Pending"}</p>
      <span className="complete">
        <p>Done?:</p>
        <input
          type="checkbox"
          value={task.completed}
          checked={isCompleted}
          onChange={handleCompleted}
        />
      </span>

      <span className="modifyTask">
        <RiEdit2Fill
          className="editTask"
          onClick={() => triggerEditModal(task)}
        />
        <MdOutlineDelete
          className="deleteTask"
          onClick={() => handleDelete(task._id)}
        />
      </span>
    </li>
  );
};

export default TaskItem;
