import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Public/Img/logo.png";
import Axios from "axios";
const AllGroups = props => {
  const [error, setError] = useState({
    error: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [Groups, setGroups] = useState([]);

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user"));

    Axios.defaults.headers = {
      Authorization: User.Token
    };
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   }
    // };

    Axios.post("/group/all", { Email: User.Email })
      .then(res => {
        if (res.data.error) {
          setIsLoading(false);
          setError({
            error: true,
            msg: res.data.msg
          });
          return;
        }
        setIsLoading(false);
        setGroups(res.data.result);
      })
      .catch(err => {
        setIsLoading(false);
        setError({
          error: true,
          msg: "Some Technical Error"
        });
      });
  }, []);

  const EnrollNow = Group => {
    localStorage.setItem("newGroupEvent", "true");
    const user = JSON.parse(localStorage.getItem("user"));
    const Data = {
      Email: user.Email,
      GroupId: Group.GroupId
    };

    Axios.defaults.headers = {
      Authorization: user.Token
    };
    Axios.post("/group/enroll", Data)
      .then(res => {
        if (res.data.error) {
          setIsLoading(false);
          setError({
            error: true,
            msg: res.data.msg
          });
          return;
        }

        setIsLoading(false);
        window.location = "/";
      })
      .catch(err => {
        setIsLoading(false);
        setError({
          error: true,
          msg: "Some Technical Error"
        });
      });
  };

  const renderGroup = Groups => {
    return Groups.map((Group, i) => {
      return (
        <div className="chatbox" key={i}>
          {/* cbl = Chat Box Left (Side) */}
          <div className="cbl">
            <img src={Logo} alt="Profile" />
            <div className="cb-heading">
              <h5>{Group.Name}</h5>
              <p>{Group.Status}</p>
            </div>
          </div>
          <div className="cbr">
            <button onClick={EnrollNow.bind(this, Group)}>
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
      );
    });
  };
  return (
    <section className="container chatmain">
      {isLoading === true ? (
        <p>isLoading</p>
      ) : (
        <>
          {error.error === true ? (
            <p style={{ padding: "80px" }} className="alert alert-danger">
              {error.msg}
            </p>
          ) : (
            <>
              {Groups.length <= 0 ? (
                <p style={{ padding: "80px" }}>Group Not Exist</p>
              ) : (
                renderGroup(Groups)
              )}
            </>
          )}
        </>
      )}
      <div className="ins_grp" style={{ marginBottom: "30px" }}>
        <Link to="/main/group/insert" className="btn btn-primary btn-block">
          Create New Group
        </Link>
      </div>
    </section>
  );
};

export default AllGroups;
