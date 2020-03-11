import React, { useState, useEffect } from "react";
import Group from "./Group";
import Logo from "../../Public/Img/logo.png";
const Profile = props => {
  const [user, setUser] = useState(null);
  const [Loading, setLoading] = useState(true);

  //   const [GroupsLoading, setLoading] = useState(true);
  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user"));
    setUser(User);
    setLoading(false);
  }, []);

  return (
    <section className="profile container">
      {Loading === true ? (
        <p className="alert alert-danger">Loading...</p>
      ) : (
        <>
          <div className="pr-img">
            <img alt="Profile Pic" src={Logo}></img>
          </div>
          <div className="pf-header">
            <h1>{user.Name}</h1>
            <b>Email : {user.Email} </b>
            {/* <b>Status : {user.Email} </b> */}
          </div>
        </>
      )}
      <hr className="hr-black" />
      {/* Groups */}
      <div className="user-group">
        <div className="ug-head">
          <h2>Groups</h2>
          <hr />
        </div>
        <div className="ug-body">
          <Group props={props} />
        </div>
      </div>
    </section>
  );
};

export default Profile;
