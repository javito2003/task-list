import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/user";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  //STATE
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [watchPass, setWatchPass] = useState(false);

  //FUNCTIONS
  const handleData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (data.password === "adminpass" && data.username === "admin") {
      dispatch(login());
      toast.success("Login successfully");
      history.push("/");
    } else {
      setData({ username: "", password: "" });
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <div className="col-md-2 offset-md-5">
      <div style={{ marginTop: "50%" }}>
        <form className="card card-body" onSubmit={onSubmit}>
          <h2 className="text-center mb-3">Login</h2>
          {error && (
            <small className="text-center mb-3 text-danger">
              Username or password invalid
            </small>
          )}
          <input
            type="text"
            className="form-control"
            value={data.username}
            placeholder="Username"
            name="username"
            onChange={(e) => handleData(e)}
          />
          <div className="input-group my-3">
            <input
              type={watchPass ? "text" : "password"}
              className="form-control "
              value={data.password}
              placeholder="Password"
              name="password"
              onChange={(e) => handleData(e)}
            />
            <div className="input-group-append">
              <button
                onClick={() => setWatchPass(!watchPass)}
                type="button"
                className="btn btn-outline-secondary input-group-text"
              >
                <i
                  className={`far ${watchPass ? "fa-eye-slash" : "fa-eye"} `}
                ></i>
              </button>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
