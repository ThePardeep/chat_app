import React, { useState } from "react";
import UniqueIdGen from "uniqid";
import Axios from "axios";

const Insert = props => {
  const [GroupName, setGroupName] = useState(null);
  const [GroupStatus, setGroupStatus] = useState(null);
  const [error, setError] = useState({ error: false });
  const SubmitForm = E => {
    E.preventDefault();
    const User = JSON.parse(localStorage.getItem("user"));
    const UniqueId = UniqueIdGen() + User.Email;
    if (!GroupName || !GroupStatus) {
      setError({
        error: true,
        msg: "Enter Correct Group Details"
      });
      return;
    }
    setError({
      error: false
    });

    const Data = {
      GroupName,
      GroupStatus,
      UniqueId,
      Created_By: User.Email
    };

    Axios.defaults.headers = {
      Authorization: User.Token
    };
    Axios.post("/group/insert", Data)
      .then(res => {
        if (res.data.error) {
          setError({
            error: true,
            msg: res.data.msg
          });
          return;
        }

        props.props.props.history.push("/main");
      })
      .catch(err => {
        setError({
          error: true,
          msg: "Some Technical Error"
        });
      });
  };

  return (
    <section className="login">
      <div className="heading">
        <h2>Create Group</h2>
      </div>
      <hr className="hr-black container" />

      {/* If Any Error Exist */}
      {error.error === true ? (
        <div className=" container ">
          <p className="alert-danger">{error.msg}</p>
        </div>
      ) : null}
      <form onSubmit={SubmitForm} className="container">
        <div className="form-group">
          <label htmlFor="gpname">Group Name</label>
          <input
            type="text"
            className="form-control"
            id="gpname"
            placeholder="Group Name"
            onChange={E => setGroupName(E.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Status">Status</label>
          <input
            type="text"
            className="form-control"
            id="Status"
            placeholder="Status"
            onChange={E => setGroupStatus(E.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </section>
  );
};

export default Insert;
