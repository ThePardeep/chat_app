import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Public/Img/logo.png";
const Header = () => {
  const Logout = E => {
    localStorage.removeItem("newGroupEvent");
    localStorage.removeItem("user");
    localStorage.removeItem("groups");
    window.location = "/";
  };
  return (
    <main>
      <div className="header row">
        <div
          className="SmHeader col-sm-12 col-md-12 col-lg-12"
          style={{ paddingLeft: "8px" }}
        >
          <Link to="/">
            <div
              className="headerMetaData"
              style={{
                marginLeft: "0px",
                display: "inline-block"
              }}
            >
              <img style={{ display: "inline-block" }} src={Logo} alt="logo" />
            </div>

            <div
              style={{
                display: "inline-block",
                textAlign: "center",
                position: "absolute"
              }}
            >
              <h1 className="headerHeading">Chat App</h1>
              <p className="headerHeadLine">Make Connection</p>
            </div>
          </Link>
          <div
            className="headerBtn"
            style={{
              float: "right"
            }}
          >
            {localStorage.getItem("user") === null ? null : (
              <>
                <Link className="headerBTN" to="/main/user/profile">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </Link>
                <button
                  className="headerBTN"
                  onClick={Logout.bind(this)}
                  title="Logout"
                >
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Header;
