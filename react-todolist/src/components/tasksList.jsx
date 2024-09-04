/* eslint-disable react/prop-types */
const TasksList = ({ tasks }) => {
  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <li key={task._id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Status: {task.completed ? "Completed" : "Pending"}</p>
        </li>
      ))}
    </ul>
  );
};
export default TasksList;
