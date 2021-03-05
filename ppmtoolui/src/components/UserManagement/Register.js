import React, { Component } from "react";
import * as userManagementActions from "../../actions/usermangementActions";
import { connect } from "react-redux";
import * as projectActions from "../../actions/projectActions";

class Register extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    errors: {},
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
      confirmPassword: this.state.confirmPassword,
      fullname: this.state.fullname,
    };
    this.props.registeraction(newUser, this.props.history);
  };

  componentWillUnmount() {
    this.props.clearProjectAction();
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={
                      errors.fullname
                        ? "form-control form-control-lg is-invalid"
                        : "form-control form-control-lg"
                    }
                    placeholder="Full Name"
                    name="fullname"
                    value={this.state.fullname}
                    onChange={this.onChange}
                  />
                  {errors.fullname && errors.fullname}
                </div>
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
                  {errors.username && errors.password}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={
                      errors.confirmPassword
                        ? "form-control form-control-lg is-invalid"
                        : "form-control form-control-lg"
                    }
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  {errors.confirmPassword && errors.confirmPassword}
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
    registeraction: (newUser, history) =>
      dispatch(userManagementActions.createNewUSer(newUser, history)),
    clearProjectAction: () => dispatch(projectActions.clearProjectErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
