import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    console.log("render header");

    const { validToken, user } = this.props.security;
    let validUser = false;
    if (validToken && user.id && localStorage.getItem("jwtToken")) {
      validUser = true;
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Personal Project Management Tool
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                {validUser && (
                  <Link to="/dashboard" className="nav-link">
                    <i className="fas fa-user-circle mr-15">{user.fullname}</i>
                  </Link>
                )}
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {!validUser && (
                  <Link className="nav-link " to="/register">
                    Sign Up
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {validUser && (
                  <Link to="/logout" className="nav-link">
                    Logout
                  </Link>
                )}
                {!validUser && (
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    security: state.security,
  };
};

export default connect(mapStateToProps, null)(Header);
