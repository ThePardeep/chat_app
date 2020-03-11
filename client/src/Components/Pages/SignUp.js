import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
const SignUp = () => {
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("Password");
  const [ConfirmPassword, setConfirmPassword] = useState("ConfirmPassword");
  const [error, setError] = useState({ error: false });
  const [success, setSuccess] = useState({ success: false });
  const SubmitForm = E => {
    E.preventDefault();
    if (Name === "" && Email === "") {
      setError({
        error: true,
        msg: "Enter Correct Email And Name"
      });
      return;
    }
    if (Password !== ConfirmPassword) {
      console.log(Password, ConfirmPassword);
      setError({
        error: true,
        msg: "Password Not Match"
      });
      return;
    }
    if (Password.length < 6) {
      setError({
        error: true,
        msg: "Password Length To Short "
      });
      return;
    }
    setError({ error: false });

    const Data = {
      Name,
      Email,
      Password
    };
    console.log(Data);
    Axios.post("/user/signup", Data)
      .then(res => {
        if (res.data.error) {
          setError({
            error: true,
            msg: res.data.msg
          });
          return;
        }
        setSuccess({
          success: true,
          msg: res.data.msg
        });
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
        <h2>Sign Up</h2>
      </div>
      <hr className="hr-black container" />
      {/* If Any Error Exist */}
      {error.error === true ? (
        <div className=" container ">
          <p className="alert-danger">{error.msg}</p>
        </div>
      ) : null}
      {/* On Success */}
      {success.success === true ? (
        <div className=" container ">
          <p className="alert-success">{success.msg}</p>
        </div>
      ) : null}

      <form onSubmit={SubmitForm} className="container">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Enter Name"
            onChange={E => setName(E.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={E => setEmail(E.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={E => setPassword(E.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="con-password"
            placeholder="Confirm Password"
            onChange={E => setConfirmPassword(E.currentTarget.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <div className="links container">
        <hr className="hr-black" />
        <Link to="/" className="btn btn-primary">
          Login
        </Link>
      </div>
    </section>
  );
};

export default SignUp;
