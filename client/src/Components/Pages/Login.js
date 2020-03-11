import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState({ error: false });
  const SubmitForm = E => {
    E.preventDefault();
    const Data = {
      Email,
      Password
    };
    if (Email === "" || Password === "") {
      setError({
        error: true,
        msg: "Enter Correct Email And Password"
      });
      return;
    }
    setError({
      error: false
    });
    Axios.post("/user/login", Data)
      .then(res => {
        if (res.data.error) {
          setError({
            error: true,
            msg: res.data.msg
          });
          return;
        }
        var Data = {
          Name: res.data.Name,
          Email: res.data.Email,
          Token: res.data.token
        };
        Data = JSON.stringify(Data);
        localStorage.setItem("user", Data);
        window.location = "/main";
      })
      .catch(err => {
        setError({
          error: true,
          msg: err.response.data.msg
        });
      });
  };
  return (
    <section className="login">
      <div className="heading">
        <h2>Login</h2>
      </div>
      <hr className="hr-black container" />
      {/* If Any Error Exist */}
      {error.error === true ? (
        <div className=" container ">
          <p className="alert-danger">{error.msg}</p>
        </div>
      ) : null}
      <form onSubmit={SubmitForm} className="container">
        <div className="formInput" style={{ marginBottom: "10px" }}>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={E => setEmail(E.target.value)}
            required
          />
          <label htmlFor="email" className="label">
            <span className="content">Email address</span>
          </label>
        </div>
        <div className="formInput">
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={E => setPassword(E.target.value)}
            required
          />
          <label htmlFor="password" className="label">
            <span className="content">Password</span>
          </label>
        </div>

        <button
          style={{ marginTop: "20px" }}
          type="submit"
          className="btn btn-danger"
        >
          Login
        </button>
      </form>

      <div className="links container">
        <hr className="hr-black" />
        <Link to="/signup" className="btn btn-danger">
          SignUp
        </Link>
      </div>
    </section>
  );
};

export default Login;
