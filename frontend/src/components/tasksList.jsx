/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
const TasksList = ({ tasks, fetchTasks }) => {
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
  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <li key={task._id}>
          <h3>{task.title}</h3>
          <p>Todo: {task.description}</p>

          <p>Status: {task.completed ? "Completed" : "Pending"}</p>
          <span className="complete">
            <p>Done?:</p>
            <input type="checkbox" value={task.completed} />
          </span>

          <span className="modifyTask">
            <RiEdit2Fill className="editTask" />
            <MdOutlineDelete
              className="deleteTask"
              onClick={() => handleDelete(task._id)}
            />
          </span>
        </li>
      ))}
    </ul>
  );
};
export default TasksList;
