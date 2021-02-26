import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as backlogActions from "../../../actions/backlogActions";

class ProjectTask extends Component {
  render() {
    const { project_task } = this.props;
    let priorityString;
    let priorityclass;
    if (project_task.priority == 1) {
      priorityString = "HIGH";
      priorityclass = "bg-danger text-light";
    }
    if (project_task.priority == 2) {
      priorityString = "MEDIUM";
      priorityclass = "bg-warning text-light";
    }
    if (project_task.priority == 3) {
      priorityString = "LOW";
      priorityclass = "bg-info text-light";
    }
    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityclass}`}>
          ID: {project_task && project_task.projectSequence} -- Priority:{" "}
          {priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{project_task && project_task.summary}</h5>
          <p className="card-text text-truncate ">
            {project_task && project_task.acceptanceCriteria}
          </p>
          <Link
            to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            onClick={() =>
              this.props.deleteProjectTaskAction(
                project_task.projectIdentifier,
                project_task.projectSequence
              )
            }
            className="btn btn-danger ml-4"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProjectTaskAction: (backLogId, projectTaskId) =>
      dispatch(backlogActions.deleteProjectTask(backLogId, projectTaskId)),
  };
};

export default connect(null, mapDispatchToProps)(ProjectTask);
