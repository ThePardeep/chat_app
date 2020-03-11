import React, { useState, useEffect } from "react";
import Axios from "axios";

const ChatBox = props => {
  const [error, setError] = useState({
    error: false
  });
  const [msg, setMsg] = useState("");
  const [msgCount, setMsgCount] = useState(0);
  const [selfData, setSelf] = useState(null);
  const [groupData, setGroupData] = useState(props.props.props.location.state);
  const { Socket } = props.Data;
  const submitMsg = E => {
    E.preventDefault();
    var cssClass = "leftAlginChat";
    var I = msgCount;
    I++;
    setMsgCount(I);
    if (I % 2 === 0) {
      cssClass = "RightAlginChat";
    }

    EmitMsg({
      From: `${selfData.Email}`,
      To: `${groupData.GroupId}`,
      Id: Socket.id,
      msg,
      msgCount: I,
      cssClass
    });
  };

  const EmitMsg = Data => {
    Socket.emit("Chat", Data);
  };

  useEffect(() => {
    var Self;
    if ((selfData && groupData) === null) {
      Self = localStorage.getItem("user");
      Self = JSON.parse(Self);
      setSelf(Self);
    }
    Socket.on(groupData.GroupId, data => {
      setMsgCount(data.msgCount);
      LiElement(data.msg, data.cssClass, data.From);
    });
  }, []);

  const LiElement = (msg, liClass, Email) => {
    var node = document.createElement("LI");
    var nodeEmail = document.createElement("P");
    var nodeMsg = document.createElement("P");

    nodeEmail.innerText = Email;
    nodeMsg.innerText = msg;

    node.appendChild(nodeMsg);
    node.appendChild(nodeEmail);

    if (liClass === "RightAlginChat") {
      nodeEmail.classList.add("msgEmailLeft");
    } else {
      nodeEmail.classList.add("msgEmailRight");
    }

    node.classList.add(liClass);
    document.getElementById("cl").appendChild(node);
  };

  const deleteGroup = group => {
    const User = JSON.parse(localStorage.getItem("user"));
    const Data = {
      GroupId: group.GroupId,
      Email: User.Email
    };

    Axios.defaults.headers = {
      Authorization: User.Token
    };

    Axios.post("/group/user/remove", Data)
      .then(res => {
        if (res.data.error) {
          setError({
            error: true,
            msg: res.data.msg
          });
          return;
        }

        localStorage.removeItem("groups");
        window.location = "/main";
      })
      .catch(err => {
        setError({
          error: true,
          msg: "Some Error Exist"
        });
        return;
      });
  };
  return (
    <section className="chatWindow">
      <div className=" cw_metaData">
        {error.error === true ? (
          <p className="alert alert-danger">{error.msg}</p>
        ) : null}
        <div className="heading">
          {" "}
          <h4>{groupData.Name}</h4>
        </div>
        <div className="btn">
          <button
            onClick={deleteGroup.bind(this, groupData)}
            className=" btn btn-danger"
          >
            <i
              style={{ display: "inline-block" }}
              className="fa fa-trash"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
      <hr style={{ border: "1px solid black" }} />
      <div className="chat-list">
        <ul className="cl" id="cl"></ul>
      </div>
      <div className="msg-form">
        <form onSubmit={submitMsg} className="form-group ">
          <input
            onChange={E => setMsg(E.target.value)}
            type="text"
            className="form-control mb-2"
            id="msg"
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatBox;
