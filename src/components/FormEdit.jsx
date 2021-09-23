import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toDoActions } from "../store";

const FormEdit = ({ toDoEdit, changeEdit }) => {
  const dispatch = useDispatch()
  const [editToDoState, setEditToDoState] = useState(toDoEdit);

  const handleEdit = (e) => {
    setEditToDoState({
      ...editToDoState,
      [e.target.name]: e.target.value,
    });
  };

  const submitEdit = (e) => {
    e.preventDefault()
    if(editToDoState.title.trim()){
      try {
        dispatch(toDoActions.editTodo(editToDoState))
        changeEdit()
        toast.success(`Edited successfully`)
      } catch (error) {
        toast.error("Error to edit")
      }
    }
    

  }

  return (
    <form className="card" onSubmit={submitEdit}>
      <h2 className="card-header text-center">To Do Edit</h2>
      <div className=" card-body">
        <input
          type="text"
          name="title"
          value={editToDoState.title}
          onChange={(e) => handleEdit(e)}
          className="form-control my-3"
          placeholder="Enter a title"
        />
        <div className="d-grid">
          <button type="submit" className="btn btn-warning">
            Edit
          </button>
          <button type="button" className="btn btn-danger my-3" onClick={changeEdit}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormEdit;
