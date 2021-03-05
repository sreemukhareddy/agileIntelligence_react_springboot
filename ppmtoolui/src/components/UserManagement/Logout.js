import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as userManagementActions from "../../actions/usermangementActions";
import { connect } from "react-redux";

class Logout extends Component {
  constructor(props) {
    super(props);
    console.log("[Logout] constructor");
  }

  componentDidMount() {
    this.props.logoutAction();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: (history) => dispatch(userManagementActions.logOut(history)),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
