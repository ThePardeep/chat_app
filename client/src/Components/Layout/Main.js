import React, { useState, useEffect } from "react";
import ChatMain from "../Chat/ChatMain";
import AllGroups from "../Group/AllGroups";
import Axios from "axios";

const Main = props => {
  const [Tab, setTab] = useState("ChatMain");

  const ChangeTab = (E, T) => {
    if (E === "chattab") {
      setTab("ChatMain");
    } else {
      setTab("AllGroups");
    }
  };

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user"));

    Axios.defaults.headers = {
      Authorization: User.Token
    };

    Axios.get("/user/token")
      .then(res => {
        if (res.data.error) {
          if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
          }
          if (localStorage.getItem("groups")) {
            localStorage.removeItem("groups");
          }
          window.location = "/";
          // console.log(res.data);
          return;
        }
      })
      .catch(err => {
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
        }
        if (localStorage.getItem("groups")) {
          localStorage.removeItem("groups");
        }
        window.location = "/";
      });
  }, []);

  return (
    <main>
      <div className="row pm0">
        <div className="col-sm-12 col-md-12  pm0">
          <div className="row tab-btns pm0">
            {/* Chat Tab BTN */}
            <div
              className="col-6 col-sm-6 col-md-6 brLeft tab-btn-1 active-tab pm0"
              onClick={ChangeTab.bind(this, "chattab")}
            >
              <span className="tab-btn">Chat</span>
            </div>

            {/* Friend Tab Btn */}
            <div
              className="col-6 col-sm-6 col-md-6 tab-btn-2 pm0 "
              onClick={ChangeTab.bind(this, "grouptab")}
            >
              <span className="tab-btn">Group</span>
            </div>
          </div>

          {/* Component */}
          <div style={{ marginTop: "17px" }}>
            {Tab === "ChatMain" ? (
              <ChatMain props={props} />
            ) : (
              <AllGroups props={props} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
