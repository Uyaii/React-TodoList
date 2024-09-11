/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const EditTaskModal = ({
  showEditModal,
  triggerEditModal,
  editForm,
  handleEditChange,
  handleEditSubmit,
  message,
  setMessage,
  isErrorMsg,
  setIsErrorMsg,
}) => {
  return (
    <div className={`modal ${showEditModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="closeModal" onClick={triggerEditModal}>
          &times;
        </span>
        <h3>Edit Task</h3>
        <>
          {message && (
            <>
              {isErrorMsg ? (
                <div className="message task">{message}</div>
              ) : null}
            </>
          )}
        </>

        <form className="taskForm">
          <label>Title</label>
          <input
            name="title"
            type="text"
            required
            value={editForm.title}
            onChange={handleEditChange}
          />
          <label>Description</label>
          <textarea
            name="description"
            required
            value={editForm.description}
            onChange={handleEditChange}></textarea>

          <button
            type="submit"
            className="modalAddButton"
            onClick={handleEditSubmit}>
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
