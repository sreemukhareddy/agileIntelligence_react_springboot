import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as backlogActions from "../../../actions/backlogActions";

class UpdateProjectTask extends Component {
  state = {
    id: "",
    projectSequence: "",
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: "",
    dueDate: "",
    projectIdentifier: "",
    created_At: "",
  };

  componentWillUnmount() {
    this.setState({
      id: "",
      projectSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      projectIdentifier: "",
      created_At: "",
    });
  }

  componentDidMount() {
    this.props.getProjectTaskAction(
      this.props.match.params.backlog_id,
      this.props.match.params.pt_id,
      this.props.history
    );
    this.setState({
      ...this.props.project_task,
    });
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log("=================START=========================");
  //   console.log("the current state ", prevState);
  //   console.log("the nextProps ", nextProps);
  //   const test = {
  //     ...nextProps.project_task,
  //   };
  //   console.log("the nextProps ", test);
  //   console.log("==================END========================");
  //   return {
  //     ...nextProps.project_task,
  //   };
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevProps.project_task.id != this.props.project_task.id &&
  //     !this.state.id
  //   ) {
  //     this.setState({
  //       ...this.props.project_task,
  //     });
  //   }
  // }

  onChange = (event) => {
    console.log(event.target.name, " --- ", event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let newUpdatedProjectTask = {
      id: "",
      projectSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      projectIdentifier: "",
      created_At: "",
    };
    newUpdatedProjectTask = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
      created_At: this.state.created_At,
    };
    console.log(newUpdatedProjectTask);
    this.props.updatedProjectTaskAction(
      this.state.projectIdentifier,
      this.state.projectSequence,
      newUpdatedProjectTask,
      this.props.history
    );
  };

  render() {
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectBoard/${this.state.projectIdentifier}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">
                Project Name: {this.state.projectIdentifier} <br />
                Project Code: {this.state.projectSequence}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
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
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectTaskAction: (backlogId, projectTaskId, history) =>
      dispatch(
        backlogActions.getProjectTaskRelatedToAbacklog(
          backlogId,
          projectTaskId,
          history
        )
      ),
    updatedProjectTaskAction: (
      backlogId,
      projectTaskId,
      updatedProjectTask,
      history
    ) =>
      dispatch(
        backlogActions.updateProjectTask(
          backlogId,
          projectTaskId,
          updatedProjectTask,
          history
        )
      ),
  };
};

const mapStateToProps = (state) => {
  console.log("mapStateToProps =====>", state.backlog.project_task);
  return {
    project_task: state.backlog.project_task,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProjectTask);
