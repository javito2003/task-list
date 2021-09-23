import React from "react";

const ToDoRender = ({ toDo, onDelete, onEdit, onComplete }) => {
  return (
    <div className="my-4 card-css">
      <div className="card-body px-1">
        <div className="d-flex justify-content-between">
          <div style={{ cursor: "pointer" }} className="d-flex align-items-center title-container" onClick={onComplete}>
            <div className="mx-4">
              <input
                className="form-check-input"
                readOnly
                type="checkbox"
                checked={toDo.completed}
              />
            </div>
            <h5
              className={`text-wrap user-select-none title ${
                toDo.completed && "text-muted text-decoration-line-through"
              }`}
            >
              {toDo.title}
            </h5>
          </div>
          <div>
            <button className="btn btn-danger btn-sm mx-1" onClick={onDelete}>
              <i className="fas fa-trash"></i>
            </button>
            <button className="btn btn-warning btn-sm" onClick={onEdit}>
              <i className="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoRender;
