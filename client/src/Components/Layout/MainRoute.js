import Main from "./Main";
import ChatWindow from "../Chat/ChatBox";
import React, { Component } from "react";
import NotFound from "../Pages/NotFound";
import ConnectSocket from "../Socket/Socket";
import InsertGroup from "../Group/Insert";
import Profile from "../User/Profile";
export default class MainRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }
  VerifyRoute(props) {
    var Location = props.location.pathname;
    var LocationLength = Location.length;
    if (Location.substr(LocationLength - 1, LocationLength) !== "/") {
      Location = Location.concat("/");
    }

    if (Location === "/main/") {
      return { Component: Main, Data: null };
    } else if (Location === "/main/chat/window/") {
      const User = JSON.parse(localStorage.getItem("user"));
      var Socket = ConnectSocket(User);
      return {
        Component: ChatWindow,
        Data: {
          Socket
        }
      };
    } else if (Location === "/main/group/insert/") {
      return { Component: InsertGroup, Data: null };
    } else if (Location === "/main/user/profile/") {
      return {
        Component: Profile,
        Data: null
      };
    } else {
      return { Component: NotFound, Data: null };
    }
  }
  render() {
    const Component = this.VerifyRoute(this.props.props);

    return (
      <div>
        {<Component.Component Data={Component.Data} props={this.props} />}
      </div>
    );
  }
}
