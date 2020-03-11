import React, { useEffect, useState } from "react";
import Axios from "axios";
import Logo from "../../Public/Img/logo.png";
const Group = props => {
  const [UserGroup, setUserGroup] = useState([]);
  const [error, setError] = useState({
    error: false
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user"));

    Axios.post("/user/group", { Email: User.Email })
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
        setUserGroup(res.data.result);
      })
      .catch(err => {
        setIsLoading(false);
        setError({
          error: true,
          msg: "Some Technical Error"
        });
      });
  }, []);
  const OpenChatWindow = data => {
    // const LocalUser = localStorage.getItem("user");
    const Data = JSON.stringify({
      LocalUser: data
    });
    localStorage.setItem("OpenedChatWindow", Data);
    props.props.props.props.history.push("/main/chat/window", data);
  };

  const renderGroup = groups => {
    return groups.map((group, i) => {
      return (
        <div
          className="chatbox"
          key={i}
          onClick={OpenChatWindow.bind(this, group)}
        >
          <div className="cbl">
            <img src={Logo} alt="Profile Pictue" />
            <div className="cb-heading">
              <h5>{group.Name}</h5>
              <p>{group.LastMsg}</p>
            </div>
          </div>
          {/* cbr = ChatBox Right */}
          {/* <div className="cbr">
           
          </div> */}
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
              {UserGroup.length <= 0 ? (
                <p style={{ padding: "80px" }}>Group Not Exist</p>
              ) : (
                renderGroup(UserGroup)
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Group;
