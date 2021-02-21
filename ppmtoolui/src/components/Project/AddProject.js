import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import * as projectActions from "../../actions/projectActions";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
    };
  }

  componentDidMount() {
    this.props.clearProjectErrorsAction();
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log("subbmiting the form AddProject.js");
    const projectBody = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    console.log(projectBody);
    this.props.createProjectAction(projectBody, this.props.history);
  };

  render() {
    console.log("render AddProject");
    console.log("printing errors in props ", this.props.errors);
    return (
      <div>
        <h1>
          {this.props.errors.message && this.props.errors.message
            ? this.props.errors.message
            : null}
        </h1>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Create Project form</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={
                        this.props.errors && this.props.errors.projectName
                          ? "form-control form-control-lg is-invalid"
                          : "form-control form-control-lg"
                      }
                      placeholder="Project Name"
                      name="projectName"
                      value={this.state.projectName}
                      onChange={this.onChange}
                    />
                    {this.props.errors && this.props.errors.projectName ? (
                      <p>{this.props.errors.projectName}</p>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={
                        this.props.errors && this.props.errors.projectIdentifier
                          ? "form-control form-control-lg is-invalid"
                          : "form-control form-control-lg"
                      }
                      placeholder="Unique Project ID"
                      name="projectIdentifier"
                      value={this.state.projectIdentifier}
                      onChange={this.onChange}
                    />
                    {this.props.errors &&
                    this.props.errors.projectIdentifier ? (
                      <p>{this.props.errors.projectIdentifier}</p>
                    ) : null}
                  </div>
                  {/* <!-- disabled for Edit Only!! remove "disabled" for the Create operation --> */}
                  <div className="form-group">
                    <textarea
                      className={
                        this.props.errors && this.props.errors.description
                          ? "form-control form-control-lg is-invalid"
                          : "form-control form-control-lg"
                      }
                      placeholder="Project Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    ></textarea>
                    {this.props.errors && this.props.errors.description ? (
                      <p>{this.props.errors.description}</p>
                    ) : null}
                  </div>
                  <h6>Start Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="start_date"
                      value={this.state.start_date}
                      onChange={this.onChange}
                    />
                  </div>
                  <h6>Estimated End Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="end_date"
                      value={this.state.end_date}
                      onChange={this.onChange}
                    />
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    createProjectAction: (project, history) =>
      dispatch(projectActions.createProject(project, history)),
    clearProjectErrorsAction: () =>
      dispatch(projectActions.clearProjectErrors()),
  };
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

// AddProject.propTypes = {
//   createProject: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps, mapDispathToProps)(AddProject);
