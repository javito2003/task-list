//libraries
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

//STORE
import { userActions, toDoActions, errorActions } from './store'

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

//Component and guards
import { NavBar } from './components'
import { GuardRoute, PrivateRoute } from './Guards'

//css
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((store) => store.user.loggedIn);
  const error = useSelector((store) => store.error.errorMessage)


  useEffect(() => {
    if (error) {
      console.log('err', error);
      toast.error(error)
      dispatch(errorActions.cleanErrorAction())
    }
  }, [error, dispatch])

  useEffect(() => {
    if (loggedIn) {
      dispatch(toDoActions.fetchToDo());
    }
  }, [loggedIn, dispatch])

  useEffect(() => {
    dispatch(userActions.checkLogin());
  }, [dispatch]);

  return (
    <Router>
      {loggedIn && <NavBar />}
      <Switch>
        <PrivateRoute component={Home} path="/" exact />
        <GuardRoute path="/login" component={Login} />
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
