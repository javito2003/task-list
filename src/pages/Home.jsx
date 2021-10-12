import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

//store
import { userActions, toDoActions } from "../store";

//Components
import { FormEdit, ToDoRender } from "../components";

const Home = () => {
  const history = useHistory();
  //REDUX
  const dispatch = useDispatch();
  const toDo = useSelector((store) => store.toDo.toDo);

  //STATE
  const [title, setTitle] = useState("");
  const [filterList, setFilterList] = useState("All")
  const [dataRender, setDataRender] = useState([])
  const [edit, setEdit] = useState(false);
  const [toDoEdit, setToDoEdit] = useState({});
  const [toDoFinished, setToDoFinished] = useState(0);

  //FUNCTIONS
  const handleDelete = (id) => {
    const verif = toDo.find((item) => item.id === id);
    if (verif) {
      try {
        dispatch(toDoActions.deleteTodo(id));
        toast.success("Task deleted");
      } catch (e) {
        toast.error("Error to delete task");
      }
    }
  };

  const addNewToDo = (e) => {
    e.preventDefault();
    if (title.trim()) {
      if (toDo.length < 20) {
        const toCreate = {
          title,
          id: Date.now().toString(),
          completed: false,
        };
        try {
          dispatch(toDoActions.addTodo(toCreate));
          toast.success("New Task added");
        } catch (error) {
          toast.error("Error to add Task");
        }
      } else {
        toast.error("You exceeded the Task limit");
      }
      setTitle("");
    }
  };

  const handleEdit = (item) => {
    if (item) {
      setToDoEdit(item);
      setEdit(true);
    }
  };

  const handleComplete = (id) => {
    const find = toDo.find((item) => item.id === id);
    if (find) {
      find.completed = !find.completed;
      try {
        dispatch(toDoActions.editTodo(find));
        if (find.completed) {
          toast.success("Completed");
        }
      } catch (error) {
        toast.error("Error to complete");
      }
    }
  };

  const checkTaskWithOutFinish = () => {
    const toDoCopy = [...toDo];
    const tasks = [];
    toDoCopy.map((item) => {
      if (item.completed) {
        tasks.push(item);
      }
      return item;
    });
    setToDoFinished(tasks.length);
  };

  const logoutFn = () => {
    dispatch(userActions.logoutAction());
    history.push("/login");
  };

  const handleFilter = (e) => {
    setFilterList(e.target.value)
    let copy = [...toDo]
    switch(e.target.value){
      case "all":
        setDataRender(toDo)
        break
      case "completed":
        setDataRender(copy.filter(item => item.completed !== false))
        break
      case "uncompleted":
        setDataRender(copy.filter(item => item.completed !== true))
        break
      default:
        setDataRender(toDo)
    }
  }

  const setTodoToRender = () => {
    let copy = [...toDo]
    switch(filterList){
      case "all":
        setDataRender(toDo)
        break
      case "completed":
        setDataRender(copy.filter(item => item.completed !== false))
        break
      case "uncompleted":
        setDataRender(copy.filter(item => item.completed !== true))
        break
      default:
        setDataRender(toDo)
    }
  }


  const desactiveEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
      setDataRender(toDo)
  }, [toDo])

  useEffect(() => {
    setTodoToRender()
    checkTaskWithOutFinish();
  }, [toDo]);

  return (
    <div>
      <div className="container">
        <div className="mt-5">
          <div className="row ">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h2
                style={{ cursor: "pointer" }}
                className="col-md-3"
                onClick={logoutFn}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </h2>
              {edit ? (
                <FormEdit toDoEdit={toDoEdit} changeEdit={desactiveEdit} />
              ) : (
                <>
                  <form className="card" onSubmit={addNewToDo}>
                    <h2 className="card-header text-center">Note</h2>
                    <div className=" card-body">
                      <input
                        type="text"
                        className="form-control my-3"
                        placeholder="Enter a title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                  {toDo.length > 0 ? (
                    <div>
                      <div className="d-flex justify-content-between">
                        <h3 className="mt-3">
                          {toDoFinished === toDo.length
                            ? "All tasks Finished :)"
                            : `Task Finished: ${toDoFinished}/${toDo.length} `}
                        </h3>
                      </div>
                        <select
                          className="form-select"
                          value={filterList}
                          onChange={handleFilter}
                        >
                          <option value="all">All</option>
                          <option value="completed">Completed</option>
                          <option value="uncompleted">UnCompleted</option>
                        </select>
                      {dataRender.map((item) => (
                        <ToDoRender
                          key={item.id}
                          toDo={item}
                          onComplete={() => handleComplete(item.id)}
                          onDelete={() => handleDelete(item.id)}
                          onEdit={() => handleEdit(item)}
                        />
                      ))}
                    </div>
                  ) : (
                    <h1 className="text-center mt-5">No Pending Tasks :)</h1>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
