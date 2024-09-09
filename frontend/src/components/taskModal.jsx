/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const TaskModal = ({
  showModal,
  triggerModal,
  addForm,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="closeModal" onClick={triggerModal}>
          &times;
        </span>
        <h3>Add New Task</h3>
        <form className="taskForm">
          <label>Title</label>
          <input
            name="title"
            type="text"
            required
            value={addForm.title}
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            name="description"
            required
            value={addForm.description}
            onChange={handleChange}></textarea>

          <button
            type="submit"
            className="modalAddButton"
            onClick={handleSubmit}>
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
