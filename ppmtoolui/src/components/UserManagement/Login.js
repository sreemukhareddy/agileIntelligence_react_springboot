import React, { Component } from "react";
import { connect } from "react-redux";
import * as userManagementActions from "../../actions/usermangementActions";
import * as projectActions from "../../actions/projectActions";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  onChange = (event) => {
    console.log(event.target.name, " --- ", event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginAction(newUser, this.props.history);
  };

  componentWillUnmount() {
    this.props.clearProjectAction();
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={
                      errors.username
                        ? "form-control form-control-lg is-invalid"
                        : "form-control form-control-lg"
                    }
                    placeholder="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && errors.username}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={
                      errors.password
                        ? "form-control form-control-lg is-invalid"
                        : "form-control form-control-lg"
                    }
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && errors.password}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (loginReq, history) =>
      dispatch(userManagementActions.login(loginReq, history)),
    clearProjectAction: () => dispatch(projectActions.clearProjectErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
