/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
const TasksList = ({ tasks }) => {
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
            <MdOutlineDelete className="deleteTask" />
          </span>
        </li>
      ))}
    </ul>
  );
};
export default TasksList;
